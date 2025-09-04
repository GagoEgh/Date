import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone:true
})
export class ClickOutsideDirective {

  @Output()clickOutside = new EventEmitter()
  constructor(
    private el:ElementRef,
  ) { }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement:  EventTarget | null) {
    if(targetElement instanceof HTMLElement){
     const clickedInside =  this.el.nativeElement.contains(targetElement)
      if(!clickedInside){
         this.clickOutside.emit(false);
      }
    }
  }

}
