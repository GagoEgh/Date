import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShowDate } from './main/show-date/show-date';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ShowDate],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Date');
}
