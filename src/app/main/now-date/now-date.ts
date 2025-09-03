import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-now-date',
  imports: [AsyncPipe,DatePipe],
  templateUrl: './now-date.html',
  styleUrl: './now-date.scss'
})
export class NowDate implements OnInit{
  public date = new Date();
  public nowTime$: Observable<string> = formatTime();
  public nowDate$:Observable<string> = formatNowDate()
  
  constructor(){}

  ngOnInit(): void {
  }

}

function formatTime():Observable<string>{
  return interval(1000).pipe(
    map(() => {
      const date = new Date();
      const minutes = date.getMinutes();
      const hours = date.getHours();
      return `${padNumber(hours)}:${padNumber(minutes)}`;
    })
  );
}

function formatNowDate():Observable<string>{
  return interval(1000).pipe(
    map((time)=>{
      const date = new Date();
      const day  = date.getDay();
      const month = date.getMonth()+1;
      const year = date.getFullYear();
      return `${padNumber(day)}.${padNumber(month)}.${padNumber(year)}`
    })
  )
}

function padNumber(time:number):string{
  return time < 10 ? `0${time}` : `${time}`;
}

