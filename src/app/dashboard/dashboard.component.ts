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
  constructor(private flightPathService: FlightPathService, private dashboardService: DashboardService) {}

  private flightPath: any;
  private map: GoogleMap;
  private destinationViews: DestinationViews;
  private mapCanvas: 'flightChecker';
  private searching = false;

  ngOnInit() {
    this.initiateMap();
  }

  private initiateMap = (): GoogleMap => this.map = this.dashboardService.setMap();

  private addFlightPath(coordinates: any): void {
    this.flightPath = this.flightPathService.setPolyline(coordinates);
    this.flightPath.setMap(this.map);
  }

  private removeFlightPath = (): void => this.flightPath.setMap(null);

  private onSearching = (value: boolean): boolean => this.searching = value;

  private onSetDestinationViews = (destinationViews: DestinationViews): DestinationViews => this.destinationViews = destinationViews;
}
