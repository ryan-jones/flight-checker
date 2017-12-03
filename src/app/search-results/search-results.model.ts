import { FlightResult } from '../shared/models/flights.model';
import { GooglePlace } from '../shared/models/google.model';

export interface SearchResults {
  flightResults: FlightResult;
}

export interface DestinationViews {
  departureView: GooglePlace;
  arrivalView: GooglePlace;
}
