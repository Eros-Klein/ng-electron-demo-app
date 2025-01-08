# Your first Angular-Electron-App

## Goals
- Learning how to deploy a __Angular__ application using *electron*

## Requirements
- [Node.js](https://nodejs.org/en/download/)
- [TailwindCSS (not necessary)](https://tailwindcss.com/docs/guides/angular)

## Steps to create ng-electron-app
1. Create the Angular-Application:
```
ng new --directory <folder-name> --routing --skip-tests --standalone --strict --style css --view-encapsulation ShadowDom --ssr false <project-name>
```
2. Install electron package via NodeJS
```
npm install --save-dev electron@latest
```
3. Create the electron app file in the root directory and add the following code:
```
const {app, BrowserWindow} = require('electron')
    const url = require("url");
    const path = require("path");

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/<electron-app>/browser/index.html`),
          protocol: "file:",
          slashes: true
        })
      );

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })
```
4. In your package.json file, set the app.js file as entrypoint
5. Start it via running following command:
```
ng build --base-href ./ && npx electron .
```
6. Creating executable file which can be found in the dist folder:
```
npm install --save-dev electron-builder
npx electron-builder build
```
