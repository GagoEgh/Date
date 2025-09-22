import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone:true
})
export class ClickOutsideDirective {
 
  @Output()clickOutside = new EventEmitter();
  @Input()allDate!:ElementRef<HTMLDivElement>;
  constructor(
    private el:ElementRef,
  ) { }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement:  EventTarget | null) {
    if(targetElement instanceof HTMLElement){
      const clickedInside =  this.el.nativeElement.contains(targetElement);

      if(!clickedInside &&  targetElement.contains(this.allDate.nativeElement)){
         this.clickOutside.emit(false);
      }
    }
  }

}
