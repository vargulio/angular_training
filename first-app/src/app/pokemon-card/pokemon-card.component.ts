import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, ViewEncapsulation, Output } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';

export interface Pokemon {
  name: string;
  image: string;
  type: string;
}

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  template: `
    <div class="card-container" [appHighlight]="'blue'">
      <div class="card-header">{{pokemon.name}}</div>
      <img class="card-image" [src]="pokemon.image" alt="pokemon image">
      <div class="card-description">{{pokemon.type}}</div>
      <button (click)="notifyMamma()">Mommy, help!</button>
    </div>
  `,
  styleUrl: './pokemon-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PokemonCardComponent {

  @Input() pokemon!: Pokemon;
  @Output() somthingHappened: EventEmitter<string> = new EventEmitter()
  
  notifyMamma() {
    this.somthingHappened.emit("I pooped in my pants!");
  }
}
