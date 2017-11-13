import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { GoogleMap } from '../shared/models/map.model';
import { SearchResultService } from './search-result.service';
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
  @Input() durations: any;
  @Input() loaded: boolean;
  @Input() searching: boolean;
  @Output() onAddFlightPath: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveFlightPath: EventEmitter<any> = new EventEmitter<any>();

  private flightPath: any;
  private backgroundImage: any;

  constructor(
    private flightCheckService: FlightCheckService,
    private flightPathService: FlightPathService,
    private searchService: SearchResultService
  ) {}

  ngOnChanges() {
    if (this.arrivalView) {
      this.searchService.getDestinationImage(this.arrivalView.name).subscribe(res => {
        this.backgroundImage = res;
        console.log('background', this.backgroundImage);
      });
    }
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
