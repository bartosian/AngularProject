import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

  currency: any;
  bill: Bill;
  currencyHistory: any;

  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency(),
      this.billService.getCurrencyHistory('2018-01-01'),
      this.billService.getCurrencyHistory('2017-06-01'),
      this.billService.getCurrencyHistory('2017-01-01'),
      this.billService.getCurrencyHistory('2016-06-01'),
      this.billService.getCurrencyHistory('2016-01-01'),
      this.billService.getCurrencyHistory('2015-06-01'),
      this.billService.getCurrencyHistory('2015-01-01'),
      this.billService.getCurrencyHistory('2014-06-01')
    ).subscribe((data: [Bill, any, any, any, any, any]) => {
      this.bill = data[0];
      this.currency = data[1];

      const dataArr = data.slice(2)
        .map(m => {
          const { date, rates } = m;
          return {
            date,
            'usd': rates['USD'],
            'btc': rates['BTC'],
            'gbp': rates['GBP']
          };
        });
      this.currencyHistory = dataArr;
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
