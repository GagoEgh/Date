import { ChangeDetectionStrategy,ChangeDetectorRef,Component, ElementRef, EventEmitter, inject, Input, Output, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { ArrowDownSvg } from '../../ui/icons/arrow-down-svg/arrow-down-svg';
import { ArrowUpSvg } from '../../ui/icons/arrow-up-svg/arrow-up-svg';
import { Day } from '../../components/day/day';
import { DatePipe } from '@angular/common';
import { Previous } from '../../ui/icons/previous-svg/previous';
import { Next } from '../../ui/icons/next-svg/next';
import { Month } from '../../components/month/month';
import { Year } from '../../components/year/year';
import { Time } from '../../ui/interfaces/date.interface';
import { IChangedTimeEvent } from '../../ui/interfaces/change-time.interface';
import { CalendarService } from '../../shared/services/calendar.service';

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
  private calendarService = inject(CalendarService);
  private readonly cdr = inject(ChangeDetectorRef);

  public time = Time;
  public changedTime:Time = this.time.day;
  public dateShow = new Date()
  public date = signal(new Date());
  public displayedPeriod:WritableSignal<null|string> = signal(null);
  public isCloseTable = false;
  public pendingShowCalendar = false;

  constructor(){
    this.displayedPeriod.set(this.datePipe.transform(this.date(),'MMMM, yyyy'));
  }

  @Output()eventDivElement = new EventEmitter()
  @Input() set isShowCalendar(value:boolean){
    if(!value){
      this.showNowTime()
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

  public showNowTime(){
    this.date.set(new Date())
    this.updateTime();
  }

  public changeTime(){
    if(this.changedTime === this.time.day){
      this.changedTime = this.time.month;
      this.displayedPeriod.set(this.datePipe.transform(this.date(),'yyyy'));
      return
    }

    if(this.changedTime === this.time.month){
      this.changedTime = this.time.year;
      this.displayedPeriod.set(`${this.calendarService.inYear}-${this.calendarService.inYear+9}`);
      return
    }
  }

  public previousDate(){
    switch(this.changedTime){
      case this.time.day:
        this.date().setMonth(this.date().getMonth() - 1);
        this.date.set(new Date(this.date().getFullYear(),this.date().getMonth()))
        this.updateTime();
        break;
      case this.time.month:
        this.getPrevMonthDate();
        break;
      case this.time.year:
        if(this.calendarService.inYear>1925){
          this.calendarService.toYears.set([]);
          this.calendarService.inYear -= 10;
          this.displayedPeriod.set(`${this.calendarService.inYear}-${this.calendarService.inYear+9}`);
        }

        break;
    }
  }

  public nextDate(){
    switch(this.changedTime){
      case this.time.day:
        this.date().setMonth(this.date().getMonth() + 1);
        this.date.set(new Date(this.date().getFullYear(),this.date().getMonth()))
        this.updateTime();
        this.cdr.markForCheck();
        break;
      case this.time.month:
        this.getNextMonthDate()
        break;
      case this.time.year:
        if(this.calendarService.inYear<2119){
          this.calendarService.toYears.set([]);
          this.calendarService.inYear += 10;
          this.displayedPeriod.set(`${this.calendarService.inYear}-${this.calendarService.inYear+9}`);
        }

        break;
    }
  }

  public changedTimeEvent(ev:IChangedTimeEvent){
    this.date.set(ev.month)
    this.changedTime = ev.time;
    this.displayedPeriod.set(this.datePipe.transform(this.date(),'MMMM, yyyy'));
  }

  private getPrevMonthDate(){ 
    if(this.calendarService.inYear>1925){
      let year = this.date().getFullYear();
      year -=1;
      const fromYear = this.calendarService.inYear;
      if(year < fromYear){
        this.calendarService.inYear =fromYear-10;
      }
      this.date.set(new Date(year,1));
      this.displayedPeriod.set(this.datePipe.transform(this.date(),'yyyy'));
      this.calendarService.months = [];
    }
  }

  private getNextMonthDate(){
    if(this.calendarService.inYear<2125){
      let year = this.date().getFullYear();
      year +=1;
      const toYear = this.calendarService.inYear+9;
      if(year>toYear){
        this.calendarService.inYear = toYear+1;
      }
      this.date.set(new Date(year,1))
      this.displayedPeriod.set(this.datePipe.transform(this.date(),'yyyy'));
      this.calendarService.months = [];
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

  private updateTime(){
    this.displayedPeriod.set(this.datePipe.transform(this.date(),'MMMM, yyyy'));
    this.changedTime = this.time.day;
  }

}
