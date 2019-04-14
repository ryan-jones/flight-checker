import { Component, Input } from "@angular/core";

@Component({
  selector: "flight-routes",
  templateUrl: "./flight-routes.component.html",
  styleUrls: ["./flight-routes.component.scss"]
})
export class FlightRoutesComponent {
  @Input() route: any;
}
