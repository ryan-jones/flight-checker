import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { GooglePlace } from '../shared/models/google.model';
import { FlightCheckerViewService } from './flight-checker.service';
import { FlightCheckService } from '../shared/services/flight-check.service';
import { FlightDetails } from '../shared/models/flights.model';
import { SearchResultsService } from '../shared/services/search-results.service';
import { DestinationViews } from '../search-results/search-results.model';

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

  setAutoCompletes() {
    this.setDepartureAutocomplete();
    this.setArrivalAutocomplete();
  }

  setDepartureAutocomplete() {
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

  setArrivalAutocomplete() {
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

  searchFlights() {
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

  arrangeFlightDates(dates: string[]) {
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

  getFlights(flight: FlightDetails) {
    this.onSearching.emit(true);
    this.flightCheckService
      .getFlights(flight, this.stopovers)
      .subscribe(result => {
        this.flightResults = result;
        this.loaded = true;
        this.setSearchResults(this.flightResults);
        this.setDestinationViews(this.departureView, this.arrivalView);
      });
  }

  addDepartureRange = () => this.departureRange = !this.departureRange;

  addReturnRange = () => this.returnRange = !this.returnRange;

  setCurrency = (currency: string) => this.selectedCurrency = currency;

  setSearchResults = (flightResults) => this.searchResultsService.setSearchResults({flightResults});

  setDestinationViews = (departureView, arrivalView) => this.onSetDestinationViews.emit({departureView, arrivalView});
}
