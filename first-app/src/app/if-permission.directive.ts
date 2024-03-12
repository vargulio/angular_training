import { Directive, ElementRef, ViewContainerRef, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[roles]',
  standalone: true
})
export class IfPermissionDirective {

  currentUserRole = 'user';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set roles(value: string[]) {
    if(value.includes(this.currentUserRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear();
    }
  }
}
