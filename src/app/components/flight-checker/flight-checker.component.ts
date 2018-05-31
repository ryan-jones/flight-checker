import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { GooglePlace } from '../../models/google.model';
import { FlightCheckerViewService } from '../../services/flight-checker.service';
import { FlightCheckService } from '../../services/flight-check.service';
import { SearchResultsService } from '../../services/search-results.service';
import { FlightDetails } from '../../models/flights.model';
import { DestinationViews, SearchResults } from '../../models/search-results.model';


@Component({
  selector: 'flight-checker',
  templateUrl: './flight-checker.component.html',
  styleUrls: ['./flight-checker.component.scss']
})
export class FlightCheckerComponent implements OnInit {
  @ViewChild('departure') departureInput;
  @ViewChild('arrival') arrivalInput;
  @Output() onSearching: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSetDestinationViews: EventEmitter<DestinationViews> = new EventEmitter<DestinationViews>();
  private departureView: GooglePlace;
  private arrivalView: GooglePlace;

  private departureLocation: string;
  private arrivalLocation: string;
  private departureStartDate: string;
  private departureEndDate: string;
  private returnStartDate: string;
  private returnEndDate: string;
  private selectedCurrency = 'USD';

  private priceLimit: number;
  private stopovers = 0;

  private loaded = true;
  private departureRange = false;
  private returnRange = false;

  private flightResults: any;

  constructor(
    private flightCheckViewService: FlightCheckerViewService,
    private flightCheckService: FlightCheckService,
    private searchResultsService: SearchResultsService
  ) {}

  ngOnInit() {
    this.setAutoCompletes();
  }

  private setAutoCompletes(): void {
    this.setDepartureAutocomplete();
    this.setArrivalAutocomplete();
  }

  private setDepartureAutocomplete(): void {
    const departureAutocomplete = this.flightCheckViewService.buildAutocomplete(
      this.departureInput.nativeElement
    );
    departureAutocomplete.addListener('place_changed', () => {
      this.departureView = departureAutocomplete.getPlace();
      this.flightCheckService
        .getLocation(this.departureView.name)
        .subscribe(result => (this.departureLocation = result.id));
    });
  }

  private setArrivalAutocomplete(): void {
    const arrivalAutocomplete = this.flightCheckViewService.buildAutocomplete(
      this.arrivalInput.nativeElement
    );
    arrivalAutocomplete.addListener('place_changed', () => {
      this.arrivalView = arrivalAutocomplete.getPlace();
      this.flightCheckService
        .getLocation(this.arrivalView.name)
        .subscribe(result => (this.arrivalLocation = result.id));
    });
  }

  private searchFlights(): void {
    this.loaded = false;
    const dates = [
      this.departureStartDate,
      this.departureEndDate,
      this.returnStartDate,
      this.returnEndDate
    ];
    const newDates = this.flightCheckViewService.formatSelectDates(dates);
    this.arrangeFlightDates(newDates);
  }

  private arrangeFlightDates(dates: string[]): void {
    const departureDates = this.flightCheckViewService.setDepartureDates(dates);
    const returnDates = this.flightCheckViewService.setReturnDates(dates);
    const flight = this.flightCheckService.buildFlightPlan(
      this.departureLocation,
      this.arrivalLocation,
      departureDates,
      this.selectedCurrency,
      returnDates,
      this.priceLimit
    );
    this.getFlights(flight);
  }

  private getFlights(flight: FlightDetails): void {
    this.onSearching.emit(true);
    this.flightCheckService
      .getFlights(flight, this.stopovers)
      .subscribe((result: any) => {
        this.flightResults = result;
        this.loaded = true;
        this.setSearchResults(this.flightResults);
        this.setDestinationViews(this.departureView, this.arrivalView);
      });
  }

  private addDepartureRange = (): boolean => this.departureRange = !this.departureRange;

  private addReturnRange = (): boolean => this.returnRange = !this.returnRange;

  private setCurrency = (currency: string): string => this.selectedCurrency = currency;

  private setSearchResults = (flightResults: any): SearchResults => this.searchResultsService.setSearchResults({flightResults});

  private setDestinationViews = (departureView: GooglePlace, arrivalView: GooglePlace) => this.onSetDestinationViews.emit({ departureView, arrivalView });
}
