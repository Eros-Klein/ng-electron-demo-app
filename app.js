const {app, BrowserWindow} = require('electron')
const cors = require('cors');
const express = require('express');
const url = require("url");
const path = require("path");

let mainWindow
let expressApp = express();

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
})

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/ng-electron-demo/browser/index.html`),
          protocol: "file:",
          slashes: true
        })
    );

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    mainWindow.setMenu(null);
}

app.on('ready', () => {
  expressApp.use(cors());

  expressApp.get("/", async (req, res) => {
    const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
    const data = await response.json();

    res.send(JSON.stringify(data.text));
  });

  expressApp.get("/site", async (req, res) => {
    const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
    const data = await response.json();

    const returnText = `<body style="background-color:gray; padding:5px"><h1>${data.text}</h1></body>`;

    res.send(returnText);
  });

  expressApp.listen(3000, () => {
    console.log("Server running on port 3000");
  });

  createWindow();
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})