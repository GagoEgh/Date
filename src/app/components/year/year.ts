import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { CalendarService } from '../../shared/services/calendar.service';

@Component({
  selector: 'app-year',
  imports: [],
  templateUrl: './year.html',
  styleUrl: './year.scss'
})
export class Year {
  private calendarService = inject(CalendarService);
  public toYears:WritableSignal<number[]> = signal([])//this.calendarService.getYears();

  constructor(){
    effect(()=>{
      this.toYears = this.calendarService.getYears();
    })
  }
}
