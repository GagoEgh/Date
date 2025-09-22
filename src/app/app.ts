import { Component, signal } from '@angular/core';
import { ShowDate } from './main/show-date/show-date';

@Component({
  selector: 'app-root',
  imports: [ShowDate],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Date');
}
