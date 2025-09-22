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

export function padNumber(time:number):string{
  return time < 10 ? `0${time}` : `${time}`;
}

