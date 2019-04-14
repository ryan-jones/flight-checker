import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "currency-price-limit",
  templateUrl: "./currency-price-limit.component.html",
  styleUrls: ["./currency-price-limit.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CurrencyPriceLimitComponent {
  public priceLimit: number;
}
