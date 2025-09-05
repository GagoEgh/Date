import { Component, ElementRef, EventEmitter, inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { ArrowDownSvg } from '../../ui/icons/arrow-down-svg/arrow-down-svg';
import { ArrowUpSvg } from '../../ui/icons/arrow-up-svg/arrow-up-svg';


@Component({
  selector: 'app-all-date',
  imports: [ArrowDownSvg, ArrowUpSvg ],
  templateUrl: './all-date.html',
  styleUrl: './all-date.scss'
})
export class AllDate {
  public isCloseTable = false;
  public pendingShowCalendar = false;
  
  private readonly renderer = inject(Renderer2);

  @Output()eventDivElement = new EventEmitter()
  @Input() set isShowCalendar(value:boolean){

    if (!this.calendar) {
      this.pendingShowCalendar = value;
      return;
    }
    this.updateCalendarClass(value);
   
  }

  ngAfterViewInit() {
    if (this.pendingShowCalendar) {
      this.updateCalendarClass(this.pendingShowCalendar);
    }
  }

  @ViewChild('calendar')calendar!:ElementRef<HTMLDivElement>;
  @ViewChild('table')table!: ElementRef<HTMLDivElement>;
  @ViewChild('header')header!: ElementRef<HTMLDivElement>;
 
  public changeTableHeight(){
    this.isCloseTable = !this.isCloseTable;
    if (this.isCloseTable) {
      this.renderer.addClass(this.header.nativeElement, 'open');
      this.renderer.addClass(this.table.nativeElement, 'close');
      this.renderer.addClass(this.calendar.nativeElement, 'close');
      
    } else {
      this.renderer.removeClass(this.header.nativeElement, 'open');
      this.renderer.removeClass(this.table.nativeElement, 'close');
      this.renderer.removeClass(this.calendar.nativeElement, 'close');

    }
  }

  private updateCalendarClass(value: boolean) {
    if (value) {
      this.renderer.addClass(this.calendar.nativeElement, 'showCalendar');
      this.eventDivElement.emit(this.calendar)
    } else {
      this.renderer.removeClass(this.calendar.nativeElement, 'showCalendar');
    }
  }

}
