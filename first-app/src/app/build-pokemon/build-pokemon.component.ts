import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, EMPTY, ReplaySubject, Subject, Subscription, catchError, combineLatest, concatMap, debounceTime, distinctUntilChanged, distinctUntilKeyChanged, filter, finalize, forkJoin, from, interval, map, mergeMap, of, share, skip, switchMap, take, takeUntil, takeWhile, tap, throttleTime, throwError, timer } from 'rxjs';
import { PokemonService } from '../pokemon.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService) { }

  sub: Subscription | null = null;
  counter = 0;

  ngOnInit() {


    // interval(1000).pipe(
    //   take(2),
    //   switchMap((value) => {
    //     if(Math.random()>0.9) {
    //       return throwError(() => new Error("Somthing smells ...."));
    //     }
    //     return of(value);
    //   }),
    //   tap((value) => {
    //     console.log(value);
    //   }), 
    //   catchError((error) => {
    //     console.log("Error from catchError: ", error);
    //     return EMPTY;
    //   }),
    //   finalize(() => {
    //     console.log('Finalize');
    //   })      
    // ).subscribe(
    //   {
    //     complete: () => console.log('Complete')
    //   }
    // )

    const obs1$ = interval(100).pipe(take(2));
    const obs2$ = interval(1000).pipe(
      take(3),
      switchMap((value) => {
        if (Math.random() > 0.6) {
          return throwError(() => new Error("Somthing smells ...."));
        }
        return of(value);
      }),
      catchError(error => {
        return of(null);
      })
    );

    // const sub = new Subscription();
    // const obs3$ = interval(500).pipe(take(10),tap(console.log), share());

    // const sub1 = obs3$.subscribe(data => console.log('Data from subscriber A: ', data));
    // sub.add(sub1);
    // const sub2 = timer(500).pipe(switchMap(() => obs3$)).subscribe(data => console.log('Data from subscriber B: ', data));
    // sub.add(sub2);
    
    // timer(3000).pipe(
    //   tap(() => {
    //     sub.unsubscribe();
    //   })
    // ).subscribe();

    // forkJoin([obs1$, obs2$, obs3$]).pipe(
    //   tap(result => {
    //     console.log('Result', result);
    //   })
    // ).subscribe();


    // this.sub = this.form.valueChanges.pipe(
    //   throttleTime(1000),
    //   map((data) => {
    //     return {
    //       name: data.name,
    //       abilities: data.abilities?.join(', ')
    //     }
    //   }),
    //   tap(data => {
    //     console.log(++this.counter);
    //     return 'bahur'
    //   }),
    //   take(5),
    //   map((data) => console.log('From map: ', data) )
    //   // filter(transformedObject => !!(transformedObject.name && transformedObject.abilities) )
    // ).subscribe();

    // this.form.valueChanges.pipe(
    //   map(formValue => formValue.abilities),
    //   distinctUntilChanged((previous, current) => previous?.length === current?.length )
    //   )
    // .subscribe(console.log);


    // const obsShared$ = interval(400).pipe(
    //   map(index => {
    //     console.log("MAPVAM ");
    //   }),
    //   share(),
    //   take(10)
    // );

    // obsShared$.subscribe((d) => console.log('Data from sub1: ', d));
    // obsShared$.subscribe((d) => console.log('Data from sub2: ', d));


    const subject = new BehaviorSubject('initial');

    // subject.next('1');
    subject.subscribe((v) => console.log("Subscriber A: ", v));
    subject.next('2');
    subject.subscribe((v) => console.log("Subscriber B: ", v));


    const actions$ = interval(400).pipe(
      map((index) => {

        const random = Math.floor(Math.random() * 3);

        switch (random) {
          case 0:
            return index + "DRAW RECTANGLE";
          case 1:
            return index + "DRAW CIRCLE";
          case 2:
            return index + "DRAW TRIANGLE";
          default:
            return index + "DRAW TRIANGLE";
        }

      }),
      take(10)
    );

    const processAction$ = interval(1500).pipe(
      take(2),
      map((index) => {
        switch (index) {
          case 0:
            return "SEND REQUEST";
          case 1:
            return "RESPONSE";
          default:
            return "RESPONSE";
        }
      })
    );

    // actions$.pipe(
    //   mergeMap((action) => processAction$.pipe(map(processStep => `${action} ${processStep}`)))
    // ).subscribe(console.log);

    // combineLatest([actions$, processAction$]).subscribe(console.log);



  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit() {
    // console.log('Before from');
    // from([{}, 1, 'bahur', 'magare']).subscribe(data => {
    //   console.log(data);
    // });
    // console.log("After from");

    const timer$ = timer(5000);

    // interval(1000)
    // .pipe(
    //     takeUntil(timer$)
    // ).subscribe(console.log)
  }

  form: FormGroup<PokemonForm> = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(6), CapitalLetterValidator]],
    type: ['', Validators.required],
    image: ['', Validators.required],
    abilities: this.formBuilder.array([this.creatNewAbilityControl()])
  }, { validators: [ValidateAbilitiesLength(1)] })

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
  return function (form: AbstractControl): ValidationErrors | null {
    const abilities = form.get('abilities')?.value ?? [];
    return abilities.length < count ? { minlength: true } : null;
  }
}

function CapitalLetterValidator(control: AbstractControl): ValidationErrors | null {
  const firstLetter: string = control.value.charAt(0);
  return firstLetter === firstLetter.toUpperCase() ? null : { capitalLetter: true };
}


