import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private httpClient: HttpClient) { }

  async showRandomFact(){
    const random = Math.floor(Math.random() * 10);

    if(random >= 5){
      const fact = await firstValueFrom(this.httpClient.get<string>('http://localhost:3000/'));
      alert(fact);
    }
    else{
      open('http://localhost:3000/site', 'Random Fact', 'width=400,height=400');
    }
  }
}
