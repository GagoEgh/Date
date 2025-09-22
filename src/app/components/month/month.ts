import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input, OnInit, output } from '@angular/core';
import { Time } from '../../ui/interfaces/date.interface';
import { IChangedTimeEvent } from '../../ui/interfaces/change-time.interface';
import { CalendarService } from '../../shared/services/calendar.service';

@Component({
  selector: 'app-month',
  imports: [DatePipe],
  templateUrl: './month.html',
  styleUrl: './month.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Month{
  private readonly cdr = inject(ChangeDetectorRef);
   private calendarService = inject(CalendarService);
  private time = Time;
  public newDate = input.required<Date>();
  public year!: number;
  public months:Date[] = [];
  public changedTimeEvent = output<IChangedTimeEvent>();
  
  constructor(){
    this.initNewDateEffect()
  }

  public otherYearStyle(month:Date):boolean{
    return month.getFullYear() !== this.year?true:false
  }

  public isSameMonth(month:Date):boolean{
    const nowDate = new Date();
    return nowDate.getMonth() === month.getMonth()?true:false

  }

  public showMonth(month:Date){
    const props = {time:this.time.day,month};
    this.changedTimeEvent.emit(props);
    this.cdr.markForCheck();
  }

  private initNewDateEffect(){
    effect(()=>{
      this.year = this.newDate().getFullYear();
      this.months = this.calendarService.getMonths(this.year);
    })
  }

}
