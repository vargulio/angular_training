import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/create" routerLinkActive="teleshki bahur">Create</a>
      <a routerLink="/first" routerLinkActive="teleshki bahur">First component</a>

    </nav>
  `,
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {

}
