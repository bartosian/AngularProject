import {AfterViewInit, Component,  Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit  {

  @Input()  currencyHistory: [any];

  chartOptions = {
    responsive: true
  };

  chartData = [];

// { data: [330, 600, 260, 700], label: 'Account A' },
// { data: [120, 455, 100, 340], label: 'Account B' },
// { data: [45, 67, 800, 500], label: 'Account C' }

  chartLabels = ['January', 'February', 'Mars', 'April'];


  ngOnInit(): void {
   this.chartLabels = this.currencyHistory.map(m => {
     return m.date;
   });
   let USDData = [];
   let BTCData = [];
   for (let month of this.currencyHistory) {
     USDData.push(month['usd']);
     BTCData.push(month['btc']);
   }

   this.chartData.push({ data: USDData, label: 'USD' }, { data: BTCData, label: 'BTC' });

  }

  onChartClick(event) {
    console.log(event);
  }

}
