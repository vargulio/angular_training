import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  @Input() appHighlight = 'yellow';

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.element.nativeElement.style = `background-color: ${this.appHighlight};`;
  }

}
