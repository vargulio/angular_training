import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

interface PokemonForm {
  name: FormControl<string>;
  type: FormControl<string>;
  image: FormControl<string>;
  abilities: FormArray<FormControl<string>>;
}

@Component({
  selector: 'app-build-pokemon',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, CommonModule],
  template: `
    <div [formGroup]="form" class="form-container">
 <div class="form-field">
   <label for="name">Name</label>
   <input type="text" id="name" formControlName="name">
 </div>
  <div class="form-field">
   <label for="type">Type</label>
   <input type="text" id="type" formControlName="type">
 </div>
 <div class="form-field">
   <label>Abilities</label>
   <div id="ability-container" formArrayName="abilities">
     <div  *ngFor="let ability of abilities.controls; let i = index">
      <div class="form-field horizontal">
       <input type="text" [formControlName]="i"><button (click)="removeAbility(i)">X</button>
      </div>
      </div>
   </div>
   <button [ngClass]="{'red-border': form.errors?.['minlength']}" (click)="addAbility()">Add Ability</button>
 </div>
 <div class="form-field image-upload-container">
   <label for="image">Image</label>
   <input type="text" [hidden]="true" formControlName="image">
   <input type="file" #image (change)="onFileChange($event)" [hidden]="true">
   <div 
      class="image-placeholder" 
      (click)="openFileUpload(image)"
      [ngClass]="{'ng-touched': form.controls.image.touched, 'ng-invalid': form.controls.image.invalid}">
     <img *ngIf="image.value"  [src]="form.controls.image.value" class="image-preview">
     <span *ngIf="!image.value">No image selected</span>
   </div>
 </div>
 <button type="submit" [disabled]="form.invalid">Submit</button>
</div>
  `,
  styleUrl: './build-pokemon.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BuildPokemonComponent {

  constructor(private formBuilder: FormBuilder){}

  form: FormGroup<PokemonForm> = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(6), CapitalLetterValidator]],
    type: ['', Validators.required],
    image: ['', Validators.required],
    abilities: this.formBuilder.array([this.creatNewAbilityControl()])
  }, {validators: [ValidateAbilitiesLength(1)]})

  get abilities(): FormArray {
    return this.form.controls.abilities;
  }

  get image(): FormControl<string> {
    return this.form.controls.image;
  }

  creatNewAbilityControl(): FormControl<string> {
    return this.formBuilder.nonNullable.control<string>('', Validators.required);
  }

  addAbility(): void {
    this.abilities.push(this.creatNewAbilityControl());
  } 

  removeAbility(i: number): void {
    this.abilities.removeAt(i);
  }

  onFileChange(event: Event) {
    const fileReader = new FileReader();
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.form.patchValue({ image: fileReader.result as string });
      }
    }
  }

  openFileUpload(fileInput: HTMLInputElement): void {
    this.image.markAsTouched();
    fileInput.click();
  }

}

function ValidateAbilitiesLength(count: number): ValidatorFn {
  return function(form: AbstractControl): ValidationErrors | null {
    const abilities = form.get('abilities')?.value ?? [];
    return abilities.length < count ? {minlength: true}  : null;
  }
}

function CapitalLetterValidator(control: AbstractControl): ValidationErrors | null {
  const firstLetter: string = control.value.charAt(0);
  return firstLetter === firstLetter.toUpperCase() ? null : {capitalLetter: true};
}


