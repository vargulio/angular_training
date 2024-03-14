import { Interpolation } from '@angular/compiler';
import { Component, ViewEncapsulation } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-first-component',
  standalone: true,
  imports: [],
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FirstComponentComponent {

    title() {
      return 'bahur'
    }
    constructor(private pokemonService: PokemonService) {}
    shouldDisableBtn = false;

    onClick(event: any) {
      console.log(event);      
    }

    ngOnInit() {
      this.pokemonService.getPokemons().pipe(
        tap(pokemons => console.log(pokemons))
      ).subscribe();
    }
}
