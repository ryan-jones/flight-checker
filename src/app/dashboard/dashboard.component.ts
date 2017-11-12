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
    private flightService: FlightCheckService,
    private flightPathService: FlightPathService,
    private dashboardService: DashboardService
  ) {}

  @ViewChild('departure') departureInput;
  @ViewChild('arrival') arrivalInput;

  map: GoogleMap;
  flightPath: any;
  searchResult: any;

  departureView: GooglePlace;
  arrivalView: GooglePlace;

  departureLocation: string;
  arrivalLocation: string;
  departureStartDate: string;
  departureEndDate: string;
  returnStartDate: string;
  returnEndDate: string;
  mapCanvas: 'flightChecker';

  durations: string[] = ['result.fly_duration', 'result.return_duration'];
  checked = false;
  toggle = true;
  departureRange = false;
  returnRange = false;

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
      this.flightService
        .getLocation(this.departureView.name)
        .subscribe(result => (this.departureLocation = result.id));
    });
    console.log('departure', this.departureLocation)
  }

  setArrivalAutocomplete() {
    const arrivalAutocomplete = this.dashboardService.buildAutocomplete(
      this.arrivalInput.nativeElement
    );
    arrivalAutocomplete.addListener('place_changed', () => {
      this.arrivalView = arrivalAutocomplete.getPlace();
      this.flightService
        .getLocation(this.arrivalView.name)
        .subscribe(result => (this.arrivalLocation = result.id));
    });
  }

  searchFlights() {
    this.toggle = false;
    const dates = setDates([
      this.departureStartDate,
      this.departureEndDate,
      this.returnStartDate,
      this.returnEndDate
    ]);
    const newDates = this.dashboardService.formatSelectDates(dates);
    this.arrangeFlightDates(newDates);
  }

  arrangeFlightDates(dates: string[]) {
    const departureDates = this.dashboardService.setDepartureDates(dates);
    const returnDates = this.dashboardService.setReturnDates(dates);
    const flight = returnDates
      ? this.flightService.buildFlightPlan(
          this.departureLocation,
          this.arrivalLocation,
          departureDates,
          returnDates
        )
      : this.flightService.buildFlightPlan(
          this.departureLocation,
          this.arrivalLocation,
          departureDates
        );
    this.getFlights(flight);
  }

  addFlightPath(index) {
    const routes = this.searchResult.data[index].route;
    const coordinates = this.flightService.createFlightCoordinates(routes);
    const lastRoute = routes[routes.length - 1];
    coordinates.push({ lat: lastRoute.latTo, lng: lastRoute.lngTo });
    this.flightPath = this.flightPathService.setPolyline(coordinates);
    this.flightPath.setMap(this.map);
  }

  removeFlightPath(index) {
    this.flightPath.setMap(null);
  }

  getFlights(flight) {
    this.flightService.getFlights(flight).subscribe(result => {
      this.searchResult = result;
      this.checked = !this.checked;
      this.toggle = true;
    });
  }

  addDepartureRange() {
    this.departureRange = !this.departureRange;
  }

  addReturnRange() {
    this.returnRange = !this.returnRange;
  }
}
