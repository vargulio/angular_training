import { Interpolation } from '@angular/compiler';
import { Component, ViewEncapsulation } from '@angular/core';

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

    shouldDisableBtn = false;

    onClick(event: any) {
      console.log(event);      
    }
}
