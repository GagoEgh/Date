import { Component, inject, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Operation, OperationType } from '../../ui/interfaces/date.interface';

@Component({
  selector: 'app-day',
  imports: [DatePipe],
  templateUrl: './day.html',
  styleUrl: './day.scss',
  providers:[DatePipe]
})
export class Day implements OnInit{
  get month(){
    return this.date.getMonth()
  }

  @Input() set operetionType(value:OperationType){
    console.log('VALUE',value);
    let month = this.month;

    if(value === Operation.plus){
      month +=1;
      console.log(' 1 ')
      
    }
    if(value ===Operation.minus){
      month -=1;
      console.log(' 2 ')
    }

    console.log('MONTH',month)
    // const date = new Date(baseDate.getFullYear(), month);

  }

  private readonly datePipe = inject(DatePipe);
  date = new Date();
  calendar:Date[] = [];
  public  week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun',];

  ngOnInit(): void {
    this.createCalendar();
  }

  private createCalendar(){
    const calendar: Date[] = [];
    
    const currentMonthName = this.datePipe.transform(this.date, 'MMM');
    const baseDate = new Date(this.date);

    for (let day = 1; day <= 31; day++) {
      const candidateDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), day);
      const candidateMonthName = this.datePipe.transform(candidateDate, 'MMM');

      if (candidateMonthName === currentMonthName) {
        calendar.push(candidateDate);
      }
    }

    const lastDayOfMonth = calendar[calendar.length - 1];
    const lastWeekDay = this.datePipe.transform(lastDayOfMonth, 'EEE');

    if (lastWeekDay !== 'Sun') {
      let nextDayIndex = 1;

      let nextDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, nextDayIndex);
      calendar.push(nextDate);

      while (this.datePipe.transform(nextDate, 'EEE') !== 'Sun') {
        nextDayIndex++;
        nextDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, nextDayIndex);
        calendar.push(nextDate);
      }
    }

    this.calendar = calendar;


  }
}
