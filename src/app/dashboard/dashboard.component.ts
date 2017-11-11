import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '../shared/models/map.model';
import { GooglePlace } from '../shared/models/google.model';
import { FlightCheckService } from '../shared/services/flight-check.service';
import { FlightPathService } from '../shared/services/flight-path.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
  mapCanvas: string = 'flightChecker';

  durations: string[] = ['result.fly_duration', 'result.return_duration'];
  checked: boolean = false;
  toggle: boolean = true;

  ngOnInit() {
    this.initiateMap();
    this.setAutoCompletes();
    // this.arrivalView = !this.arrivalView ? '' : this.arrivalView;
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
    const departureDates = [dates[0], dates[1]];
    const returnDates = [dates[2], dates[3]];
    const flight = this.flightService.buildFlightPlan(
      this.departureLocation,
      this.arrivalLocation,
      departureDates,
      returnDates
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

}
