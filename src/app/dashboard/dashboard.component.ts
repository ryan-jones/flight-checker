import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '../shared/models/map.model';
import { GooglePlace } from '../shared/models/google.model';
import { FlightCheckService } from '../shared/services/flight-check.service';
import { FlightPathService } from '../shared/services/flight-path.service';
import { DashboardService } from './dashboard.service';
import { setDates } from '../utils/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private flightCheckService: FlightCheckService,
    private flightPathService: FlightPathService,
    private dashboardService: DashboardService
  ) {}

  @ViewChild('departure') departureInput;
  @ViewChild('arrival') arrivalInput;

  private searchResult: any;
  private flightPath: any;
  private departureView: GooglePlace;
  private arrivalView: GooglePlace;
  private map: GoogleMap;

  private departureLocation: string;
  private arrivalLocation: string;
  private departureStartDate: string;
  private departureEndDate: string;
  private returnStartDate: string;
  private returnEndDate: string;
  private mapCanvas: 'flightChecker';

  private durations: string[] = [
    'result.fly_duration',
    'result.return_duration'
  ];
  private loaded = true;
  private searching = false;
  private departureRange = false;
  private returnRange = false;

  ngOnInit() {
    this.initiateMap();
    this.setAutoCompletes();
  }

  initiateMap() {
    this.map = this.dashboardService.setMap();
  }

  setAutoCompletes() {
    this.setDepartureAutocomplete();
    this.setArrivalAutocomplete();
  }

  setDepartureAutocomplete() {
    const departureAutocomplete = this.dashboardService.buildAutocomplete(
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
    const arrivalAutocomplete = this.dashboardService.buildAutocomplete(
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
    const newDates = this.dashboardService.formatSelectDates(dates);
    this.arrangeFlightDates(newDates);
  }

  arrangeFlightDates(dates: string[]) {
    const departureDates = this.dashboardService.setDepartureDates(dates);
    const returnDates = this.dashboardService.setReturnDates(dates);
    const flight = this.flightCheckService.buildFlightPlan(
      this.departureLocation,
      this.arrivalLocation,
      departureDates,
      returnDates
    );
    this.getFlights(flight);
  }

  getFlights(flight) {
    this.searching = true;
    this.flightCheckService.getFlights(flight).subscribe(result => {
      this.searchResult = result;
      this.loaded = true;
    });
  }

  addDepartureRange() {
    this.departureRange = !this.departureRange;
  }

  addReturnRange() {
    this.returnRange = !this.returnRange;
  }

  addFlightPath(coordinates: any) {
    this.flightPath = this.flightPathService.setPolyline(coordinates);
    this.flightPath.setMap(this.map);
  }

  removeFlightPath(event: null) {
    this.flightPath.setMap(null);
  }
}
