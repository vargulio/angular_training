import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPokemonComponent } from './build-pokemon.component';

describe('BuildPokemonComponent', () => {
  let component: BuildPokemonComponent;
  let fixture: ComponentFixture<BuildPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
