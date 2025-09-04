import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { ArrowDownSvg } from '../../ui/icons/arrow-down-svg/arrow-down-svg';

@Component({
  selector: 'app-all-date',
  imports: [ArrowDownSvg],
  templateUrl: './all-date.html',
  styleUrl: './all-date.scss'
})
export class AllDate {

  private readonly renderer = inject(Renderer2);
  private isOpen = false;

  @ViewChild('table')table!: ElementRef<HTMLDivElement>;
  @ViewChild('header')header!: ElementRef<HTMLDivElement>;
 
  public changeTableHeight(){
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.addClass(this.header.nativeElement, 'open');
       this.renderer.addClass(this.table.nativeElement, 'close');
    } else {
      this.renderer.removeClass(this.header.nativeElement, 'open');
       this.renderer.removeClass(this.table.nativeElement, 'close');
    }
  }
}
