import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from '@angular/core';
import { FlightCoordinates } from '../models/flights.model';
import { FlightCheckService } from '../services/flight-check.service';
import { SearchResultsService } from '../services/search-results.service';
import { DestinationViews, SearchResults } from '../models/search-results.model';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnChanges {
  @Input() destinationViews: DestinationViews;
  @Output() onAddFlightPath: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveFlightPath: EventEmitter<FlightCoordinates[]> = new EventEmitter<FlightCoordinates[]>();

  private searchResults: SearchResults;
  private loaded = false;

  constructor(
    private flightCheckService: FlightCheckService,
    private searchResultsService: SearchResultsService
  ) {}

  ngOnChanges() {
    if (this.searchResultsService.searchResults) {
      this.searchResults = this.searchResultsService.searchResults;
      this.loaded = true;
    }
  }

  private addFlightPath(index: number): void {
    const routes = this.searchResults.flightResults.data[index].route;
    const coordinates = this.flightCheckService.createFlightCoordinates(routes);
    const lastRoute = routes[routes.length - 1];
    coordinates.push({ lat: lastRoute.latTo, lng: lastRoute.lngTo });
    this.onAddFlightPath.emit(coordinates);
  }

  private removeFlightPath = (): void => this.onRemoveFlightPath.emit(null);
}
