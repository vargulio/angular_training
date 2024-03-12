import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, afterRender } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [FormsModule],
  template: `
    <p>
      {{counter}}
    </p>
    <div>
      <button (click)="add()">Add</button>
      <button (click)="subtract()">Subtract</button>
      <input type="text" [ngModel]="bahur" (ngModelChange)="onInputChange($event)"> {{bahur}}
    </div>
    
  `,
  styleUrl: './counter.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnChanges, OnInit {

  constructor() {
    afterRender(() => {
      console.log("render");      
    }) 
  }

  private _counter: number = 0;

  @Input() set counter(value: number) {
    console.log('Counter changed');
    this._counter = value;
  }


  @Output() counterChange: EventEmitter<number> = new EventEmitter();

  bahur = '';
  intervalId: any;

  add() {
    this.counter++;
    this.counterChange.emit(this.counter);
  }

  onInputChange(value: string) {
    this.bahur = value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);    
  }

  ngOnInit() {
    console.log("Counter component initialized");

    this.intervalId = setInterval(() => {
      console.log(this._counter++);
    }, 1000)
  }

  ngAfterViewInit() {
    console.log("The view is ready to go!");
    // this.bahur = 'CHISTO NOV BAHUR' state changes are not allowed here.
  }

  ngOnDestroy() {
    console.log("Component is dead.");
    clearInterval(this.intervalId); // JS function
  }

  subtract() {
    this.counter--;
    this.counterChange.emit(this.counter);
  }
}
