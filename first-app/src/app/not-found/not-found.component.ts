import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  template: `
    <p>
      not-found works!
    </p>
  `,
  styleUrl: './not-found.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent {

}
