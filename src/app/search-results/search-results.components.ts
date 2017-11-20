import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { GoogleMap } from '../shared/models/map.model';
import { FlightPathService } from '../shared/services/flight-path.service';
import { FlightCheckService } from '../shared/services/flight-check.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnChanges {
  @Input() departureView: any;
  @Input() arrivalView: any;
  @Input() searchResult: any;
  @Input() loaded: boolean;
  @Input() searching: boolean;
  @Input() priceLimit: number;
  @Output() onAddFlightPath: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveFlightPath: EventEmitter<any> = new EventEmitter<any>();

  private flightPath: any;


  constructor(
    private flightCheckService: FlightCheckService,
    private flightPathService: FlightPathService,
  ) {}

  ngOnChanges() {
  }

  addFlightPath(index) {
    const routes = this.searchResult.data[index].route;
    const coordinates = this.flightCheckService.createFlightCoordinates(routes);
    const lastRoute = routes[routes.length - 1];
    coordinates.push({ lat: lastRoute.latTo, lng: lastRoute.lngTo });
    this.onAddFlightPath.emit(coordinates);
  }

  removeFlightPath() {
    this.onRemoveFlightPath.emit(null);
  }
}
