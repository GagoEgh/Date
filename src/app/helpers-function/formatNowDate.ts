import { interval, map, Observable } from "rxjs";
import { padNumber } from "./date-helpers-functions";

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