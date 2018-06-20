import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-currency-price-limit',
  templateUrl: './currency-price-limit.component.html',
  styleUrls: ['./currency-price-limit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurrencyPriceLimitComponent implements OnInit {

  public priceLimit: number;

  constructor() { }


  ngOnInit() {
  }

}
