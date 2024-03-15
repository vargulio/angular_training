import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, timer } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [],
  template: `
    <p>
      pokemon-details works!
    </p>
  `,
  styleUrl: './pokemon-details.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PokemonDetailsComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // console.log(this.activatedRoute.snapshot.params);

    timer(3000).pipe(tap(() => {
        this.router.navigate(['/create']);
    })).subscribe();
  }

  @Input() set id(value: string) {
    console.log(value);
  }

}
