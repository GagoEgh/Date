import { interval, map, Observable } from "rxjs";

export function formatTime():Observable<string>{
  return interval(1000).pipe(
    map(() => {
      const date = new Date();
      const minutes = date.getMinutes();
      const hours = date.getHours();
      return `${padNumber(hours)}:${padNumber(minutes)}`;
    })
  );
}

export function formatNowDate():Observable<string>{
  return interval(1000).pipe(
    map((time)=>{
      const date = new Date();
      const day  = date.getDate();
      const month = date.getMonth()+1;
      const year = date.getFullYear();
      return `${padNumber(day)}.${padNumber(month)}.${padNumber(year)}`
    })
  )
}

export function padNumber(time:number):string{
  return time < 10 ? `0${time}` : `${time}`;
}

