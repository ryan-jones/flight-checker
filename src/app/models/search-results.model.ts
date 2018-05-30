import { FlightResult } from './flights.model';
import { GooglePlace } from './google.model';


export interface SearchResults {
  flightResults: FlightResult;
}

export interface DestinationViews {
  departureView: GooglePlace;
  arrivalView: GooglePlace;
}
