import { Injectable, signal } from "@angular/core";
import { Time } from "../../ui/interfaces/date.interface";

@Injectable({providedIn:'root'})
export class CalendarService{
    public time = Time;
    public months:Date[]=[];

    public getMonths(year:number):Date[]{
        for(let i = 0; i<16; i++){
            const month =  new Date(year,i);
            this.months.push(month);
        }
        return this.months
    }
}