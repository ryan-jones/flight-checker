import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '../shared/models/map.model';
import { FlightPathService } from '../shared/services/flight-path.service';
import { DashboardService } from './dashboard.service';
import { DestinationViews } from '../search-results/search-results.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private flightPathService: FlightPathService,
    private dashboardService: DashboardService,
  ) {}

  private flightPath: any;
  private map: GoogleMap;
  private destinationViews: DestinationViews;
  private mapCanvas: 'flightChecker';
  private searching = false;

  ngOnInit() {
    this.initiateMap();
  }

  initiateMap = () => this.map = this.dashboardService.setMap();

  addFlightPath(coordinates: any) {
    this.flightPath = this.flightPathService.setPolyline(coordinates);
    this.flightPath.setMap(this.map);
  }

  removeFlightPath = () => this.flightPath.setMap(null);

  onSearching = (value: boolean) => this.searching = value;

  onSetDestinationViews = (destinationViews: DestinationViews) => this.destinationViews = destinationViews;
}
