import { Injectable, signal, WritableSignal } from "@angular/core";

@Injectable({providedIn:'root'})
export class CalendarService{
    // 1925 - 2125 200/16
    // 1930 - 1939
    public  inYear = 2020;
    public months:Date[]=[];
    public toYears:WritableSignal<number[]>=signal([]);

    public getMonths(year:number):Date[]{
        for(let i = 0; i<16; i++){
            const month =  new Date(year,i);
            this.months.push(month);
        }
        return this.months
    }

    public getYears():WritableSignal<number[]>{
        const toYear = this.inYear+16
        for(let year=this.inYear;year<=toYear; year++){
            this.toYears().push(year)
        }

        return this.toYears
    }
}