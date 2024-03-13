import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, map, of, switchMap, timer } from 'rxjs';
import { LoggedMethod } from '../../LoggedFunc';

@Component({
  selector: 'app-create-pokemon',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, NgFor],
  template: `

    <form [formGroup]="pokemonForm">
    <div>
      <label> Name: </label>
      <input type="text" formControlName="name">
      <small *ngIf="pokemonName?.touched && pokemonName?.errors?.['name']">Ti ne si Pesho,be!</small>
    </div>
    <div>
      <label> Type:</label>
      <input type="text" formControlName="type">
      <small *ngIf="pokemonType?.touched && pokemonType?.errors?.['name']">Ti ne si Pesho,be!</small>
    </div>
    <div formArrayName="abilities">
      <label>Abilities:</label>
      <div *ngFor="let ability of abilities?.controls; let i= index">
        <input type="text" [formControlName]="i"> 
        <button (click)="removeAbility(i)">X</button>
      </div>
      <button (click)="addAbility()">Add ability</button>
    </div>
    </form>
    <button (click)="printForm()">Submit</button>

    <div>
      {{pokemonName?.errors | json}}
    </div>
    <div>
      {{pokemonForm.errors | json}}
    </div>
    <div>
      {{pokemonForm.valid}}
    </div>
  `,
  styleUrl: './create-pokemon.component.scss',
})
export class CreatePokemonComponent {

  constructor(private formBuilder: FormBuilder){}

  private readonly regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).{6,}$");


  pokemonForm = this.formBuilder.nonNullable.group({
    name: this.formBuilder.control('', {validators: [Validators.required], asyncValidators: [CustomAsyncValidator]}),
    type: [''],
    abilities: this.formBuilder.array([], [Validators.minLength(1)])
  })

  get pokemonName(): AbstractControl | null {
    return this.pokemonForm.get('name');
  }

  get abilities(): FormArray | null {
    return this.pokemonForm.get('abilities') as FormArray;
  }


  get pokemonType(): AbstractControl | null {
    return this.pokemonForm.get('type');
  }

  ngOnInit() {
    this.pokemonForm.patchValue({name: 'Stanka'});
  }

  disable() {
    this.pokemonName?.disable();
  }

  addAbility() {
    this.abilities?.push(new FormControl());
  }

  printForm() {
    console.log(this.pokemonForm.value);
  }

  removeAbility(index: number) {
    this.abilities?.removeAt(index);
  }
}

function CustomValidatorWithParam(param: string): ValidatorFn {
  return function CustomValidator(control: AbstractControl): ValidationErrors | null {

    if(control.value === param) {
      return null;
    } 
  
    return {
      someKey: true
    }
  
  }
}

function CustomValidator(control: AbstractControl): ValidationErrors | null {

  if(control.value === 'pesho') {
    return null;
  } 

  return {
    someKey: true
  }

}

function CustomAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {


  return timer(5000).pipe(switchMap(() => {
    if(control.value === 'pesho') {
      return of(null);
    } 
    return of({
      someKey: true
    })
  }))
}

function CrossFieldValidator(form: AbstractControl): ValidationErrors | null {

  const nameValue = form.get('name')?.value;
  const typeValue = form.get('type')?.value;

  if(nameValue === 'pikachu' && typeValue === 'electric') {
    return null;
  }

  return {
    invalidCombination: true
  }
}

