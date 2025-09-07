import { ChangeDetectionStrategy,ChangeDetectorRef,Component, ElementRef, EventEmitter, inject, Input, Output, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { ArrowDownSvg } from '../../ui/icons/arrow-down-svg/arrow-down-svg';
import { ArrowUpSvg } from '../../ui/icons/arrow-up-svg/arrow-up-svg';
import { Day } from '../../components/day/day';
import { DatePipe } from '@angular/common';
import { Operation, OperationType, Time } from '../../ui/interfaces/date.interface';
import { Previous } from '../../ui/icons/previous-svg/previous';
import { Next } from '../../ui/icons/next-svg/next';
import { Month } from '../../components/month/month';
import { Year } from '../../components/year/year';

@Component({
  selector: 'app-all-date',
  imports: [ArrowDownSvg, ArrowUpSvg,Day,DatePipe,Previous, Next,Month,Year],
  providers: [DatePipe],
  templateUrl: './all-date.html',
  styleUrl: './all-date.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllDate {
  private readonly renderer = inject(Renderer2);
  private readonly datePipe = inject(DatePipe);
  private readonly cdr = inject(ChangeDetectorRef);

  public time = Time;
  public changedTime:Time = this.time.day;
  public date = new Date();
  public displayedPeriod:WritableSignal<null|string> = signal(null);
  public isCloseTable = false;
  public pendingShowCalendar = false;

  constructor(){
    this.displayedPeriod.set(this.datePipe.transform(this.date,'MMMM, yyyy'));
    this.monthCount = this.date.getMonth()
  }

  @Output()eventDivElement = new EventEmitter()
  @Input() set isShowCalendar(value:boolean){
    if(!value){
      this.updateTime()
    }

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

  public updateTime(){
    this.displayedPeriod.set(this.datePipe.transform(this.date,'MMMM, yyyy'));
    this.changedTime = this.time.day;
  }

  public changeTime(){
    if(this.changedTime === this.time.day){
      this.changedTime = this.time.month;
      this.displayedPeriod.set(this.datePipe.transform(this.date,'yyyy'));
      this.cdr.markForCheck()
      return
    }

    if(this.changedTime === this.time.month){
      this.changedTime = this.time.year;
      this.displayedPeriod.set('2020-2029');
      this.cdr.markForCheck()
      return
    }
  }

  
  public operetionType:OperationType = '';
  public previousDate(){
    switch(this.changedTime){
      case this.time.day:
      this.operetionType = Operation.minus;
        break;
      case this.time.month:
        break;
      case this.time.year:
        break;
    }
  }



  monthCount = 0;
  public nextDate(){
    switch(this.changedTime){
      case this.time.day:
        this.operetionType = Operation.plus;

        this.monthCount +=1;

        console.log('M OO N T H', this.monthCount)
        break;
      case this.time.month:
        break;
      case this.time.year:
        break;
    }

    console.log('TYPE',this.operetionType);
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

// enum Operation {plus='plus',minus='minus'}