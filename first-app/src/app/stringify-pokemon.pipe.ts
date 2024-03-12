import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon-card/pokemon-card.component';

@Pipe({
  name: 'stringifyPokemon',
  standalone: true
})
export class StringifyPokemonPipe implements PipeTransform {

  transform(value: Pokemon, ...keys: (keyof Pokemon)[]): string {
    return Object.keys(value)
    .filter((key: string) => !keys.includes(key as keyof Pokemon) )
    .map(key => value[key as keyof Pokemon])
    .join(', ');
  }

}
