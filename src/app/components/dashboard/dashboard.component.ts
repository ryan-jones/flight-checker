import { Component, OnInit } from "@angular/core";
import { FlightPathService } from "../../services/flight-path.service";
import { DashboardService } from "../../services/dashboard.service";
import { GoogleMap } from "../../models/map.model";
import { DestinationViews } from "../../models/search-results.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private flightPathService: FlightPathService,
    private dashboardService: DashboardService
  ) {}

  private flightPath: any;
  private map: GoogleMap;
  public destinationViews: DestinationViews;
  public searching = false;

  ngOnInit() {
    this.initiateMap();
  }

  private initiateMap = (): GoogleMap =>
    (this.map = this.dashboardService.setMap());

  public addFlightPath(coordinates: any): void {
    this.flightPath = this.flightPathService.setPolyline(coordinates);
    this.flightPath.setMap(this.map);
  }

  public removeFlightPath = (): void => this.flightPath.setMap(null);

  public onSearching = (isSearching: boolean) => (this.searching = isSearching);

  public onSetDestinationViews = (views: DestinationViews) =>
    (this.destinationViews = views);
}
