import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arrow-up-svg',
  imports: [],
  templateUrl: './arrow-up-svg.html',
  styleUrl: './arrow-up-svg.scss'
})
export class ArrowUpSvg {

  @Input()width = '24px';
  @Input()height = '24px'
}
