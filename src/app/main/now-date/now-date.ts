import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { formatNowDate, formatTime } from '../../helpers-function/date-helpers-functions';
import { ClickOutsideDirective } from '../../directives/click-outside'
import { AllDate } from '../all-date/all-date';
import { Week } from '../../ui/interfaces/date.interface';

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

  private week = Week;
  get weekDay(){
    const day = this.date.getDay();
    return this.week[day]
  }
  
  constructor(){}
  allDate!:ElementRef<HTMLDivElement>;

  ngOnInit(): void {
  }

  public showCalendar(){
    this.isShowCalendar = !this.isShowCalendar
  }

  public clickOutside(ev:boolean){
    this.isShowCalendar = ev;
  }

  public eventDivElement(ev:ElementRef){
    this.allDate = ev;
  }
}
