import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvas: ElementRef<HTMLCanvasElement>;
  ctx: any;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() { this.ctx = this.canvas.nativeElement.getContext('2d'); }

}
