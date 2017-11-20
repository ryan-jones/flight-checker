import { Component, Input, OnChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'flight-routes',
  templateUrl: './flight-routes.component.html',
  styleUrls: ['./flight-routes.component.scss']
})
export class FlightRoutesComponent implements OnChanges {

  @Input() route: any;

  ngOnChanges() {
  }
}
