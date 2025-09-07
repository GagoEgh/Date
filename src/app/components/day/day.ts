import { Component, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IDate } from '../../ui/interfaces/date.interface';

@Component({
  selector: 'app-day',
  imports: [DatePipe],
  templateUrl: './day.html',
  styleUrl: './day.scss',
  providers:[DatePipe]
})
export class Day{
  public  week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun',];
  public calendar:IDate[] = [];

  private readonly datePipe = inject(DatePipe);
  private date:IDate ={date:new Date(),activeDay:false};

  @Input() set newDate(value:Date){
    this.date.date = value;
    this.createCalendar();
  }

  public otherMonthStyle(date:Date):boolean{
    const currentMonthName = this.datePipe.transform(this.date.date, 'MMM');
    const dateMonthName = this.datePipe.transform(date,'MMM')
    return currentMonthName !== dateMonthName
  }

  public isSameDay(date:Date):boolean{
    const today = new Date();
    return today.toDateString() === date.toDateString();
  }

  public chooseDay(date:IDate){
    this.calendar.forEach(item=>item.activeDay=false);
    date.activeDay = true;
  }

  private createCalendar(){
    const calendar: IDate[] = [];
    
    const currentMonthName = this.datePipe.transform(this.date.date, 'MMM');
    const baseDate = new Date(this.date.date);

    for (let day = 1; day <= 31; day++) {
      const candidateDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), day);
      const candidateMonthName = this.datePipe.transform(candidateDate, 'MMM');

      if (candidateMonthName === currentMonthName) {
        calendar.push({date:candidateDate,activeDay:false});
      }
    }

    this.calendar = this.alignCalendarToMonday(baseDate,calendar)
    this.calendar = this.completeWeek(baseDate,calendar)
  }

  private alignCalendarToMonday(
    baseDate: Date,
    calendar: IDate[]
  ): IDate[] {
    const firstDayOfMonth = calendar[0].date;
    const firstWeekDay = this.datePipe.transform(firstDayOfMonth, 'EEE');

    if (firstWeekDay === 'Mon') {
      return calendar;
    }

    let prevDayIndex = 0;
    let previousDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), prevDayIndex);
    calendar.unshift({date:previousDate,activeDay:false});

    while (this.datePipe.transform(previousDate, 'EEE') !== 'Mon') {
      prevDayIndex--;
      previousDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), prevDayIndex);
      calendar.unshift({date:previousDate,activeDay:false});
    }

    return calendar;
  }

  private completeWeek(
    baseDate: Date,
    calendar: IDate[]
  ): IDate[] {
    const lastDayOfMonth = calendar[calendar.length - 1].date;
    const lastWeekDay = this.datePipe.transform(lastDayOfMonth, 'EEE');
    if (lastWeekDay === 'Sun') {
      return calendar;
    }

    let nextDayIndex = 1;
    let nextDate = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() + 1,
      nextDayIndex
    );
    calendar.push({date:nextDate,activeDay:false});
    while (this.datePipe.transform(nextDate, 'EEE') !== 'Sun') {
      nextDayIndex++;
      nextDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, nextDayIndex);
      calendar.push({date:nextDate,activeDay:false});
    }

    return calendar;
  }

}
