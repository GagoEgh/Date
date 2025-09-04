import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { formatNowDate, formatTime } from '../../helpers-function/date-helpers-functions';
import { ClickOutsideDirective } from '../../directives/click-outside'
import { AllDate } from '../all-date/all-date';

  enum Week {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
  
  }


@Component({
  selector: 'app-now-date',
  imports: [AsyncPipe,DatePipe,ClickOutsideDirective,AllDate],
  templateUrl: './now-date.html',
  styleUrl: './now-date.scss'
})
export class NowDate implements OnInit{
  public date = new Date();
  public nowTime$: Observable<string> = formatTime();
  public nowDate$:Observable<string> = formatNowDate()
  public isShowCalendar = false;
  get weekDay(){
    const day = this.date.getDay();
    return Week[day]
  }
  
  constructor(){}

  ngOnInit(): void {
  }

  public showCalendar(){
    this.isShowCalendar = true;
  }

  public clickOutside(ev:boolean){
    this.isShowCalendar = ev;
  }
}
