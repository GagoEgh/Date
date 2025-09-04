import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arrow-down-svg',
  imports: [],
  templateUrl: './arrow-down-svg.html',
  styleUrl: './arrow-down-svg.scss'
})
export class ArrowDownSvg {

  @Input()width = '24px';
  @Input()height = '24px'
}
