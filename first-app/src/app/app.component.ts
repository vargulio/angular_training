import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstComponentComponent } from './first-component/first-component.component';
import { SecondComponentComponent } from './second-component/second-component.component';
import { environment } from '../environments/environment';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { Pokemon } from './pokemon-card/pokemon-card.component';
import { CounterComponent } from './counter/counter.component';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { IfPermissionDirective } from './if-permission.directive';
import { StringifyPokemonPipe } from './stringify-pokemon.pipe';
import { SortedPipe } from './sorted.pipe';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { BuildPokemonComponent } from './build-pokemon/build-pokemon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FirstComponentComponent, 
    SecondComponentComponent, 
    PokemonCardComponent,
    CounterComponent,
    NgIf,
    IfPermissionDirective,
    StringifyPokemonPipe,
    JsonPipe,
    SortedPipe,
    NgFor,
    CreatePokemonComponent,
    BuildPokemonComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'first-app';

  orignalCounter = 10;
  shouldShowCounter = true;

  numbersList = [1,5,4,7,1,5,10,1,2,144,7,47,4,1];

  pokemon: Pokemon = {
    name: "Pikachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    type: "electric, yellow"
  }
  constructor() {
    console.log(environment.SERVER_URL);
  }

  onChildCry(payload: string) {
    console.log(payload);
    
  }

  toggleCounter() {
    this.shouldShowCounter = !this.shouldShowCounter;
  }

  addNumber() {
    this.numbersList.push(Math.round(Math.random() * 100));
  }
}
