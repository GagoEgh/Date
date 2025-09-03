import { Component } from '@angular/core';
import { NowDate } from '../now-date/now-date';

@Component({
  selector: 'app-show-date',
  imports: [NowDate],
  templateUrl: './show-date.html',
  styleUrl: './show-date.scss'
})
export class ShowDate {

}
