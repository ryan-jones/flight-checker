import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { FlightDetails } from '../models/flights.model';
import { encodeUrl } from '../../utils/utils';

@Injectable()
export class FlightCheckService {
  BASE_URL = `https://api.skypicker.com/flights?v=2&locale=en&flyFrom=`;

  constructor(private http: Http) {}

  public getLocation(location: string) {
    return this.http
      .get(`https://api.skypicker.com/places?term=${location}&v=2&locale=en`)
      .map(res => res.json())
      .map(res => {
        return res[0];
      });
  }

  public getFlights(flight: FlightDetails) {
    if (!flight.to && !flight.departures) {
      return this.http.get(`${this.BASE_URL}${flight.from}`);
    } else {
      const url = this.setUrl(flight);
      return this.http.get(url).map(res => res.json());
    }
  }

  public setUrl(flight: FlightDetails): string {
    const request = this.setRequestUrl(flight);
    const departureDays = encodeUrl(flight.departures);
    const returnDays = flight.returns ? encodeUrl(flight.returns) : '';
    return returnDays
      ? this.setReturnUrl(request, departureDays, returnDays)
      : this.setOnewayUrl(request, departureDays);
  }

  public setRequestUrl(flight: FlightDetails) {
    return flight.to
      ? `${this.BASE_URL}${flight.from}&to=${flight.to}&dateFrom=`
      : `${this.BASE_URL}${flight.from}&dateFrom=`;
  }

  public setReturnUrl(
    request: string,
    departureDays: string[],
    returnDays: string[]
  ): string {
    const BASE_URL = `${request}${departureDays[0]}`;
    const MULTI_DEPART_URL = `${BASE_URL}&dateTo=${departureDays[1]}&typeFlight=return&returnFrom=${returnDays[0]}`;
    const SINGLE_DEPART_URL = `${BASE_URL}&typeFlight=return&returnFrom=${returnDays[0]}`;
    return departureDays.length > 1
      ? this.setReturnDatesUrl(MULTI_DEPART_URL, returnDays)
      : this.setReturnDatesUrl(SINGLE_DEPART_URL, returnDays);
  }

  public setReturnDatesUrl(url: string, returnDays: string[]): string {
    return returnDays.length < 2
      ? `${url}`
      : `${url}&returnTo=${returnDays[1]}`;
  }

  public setOnewayUrl(request: string, departureDays: string[]): string {
    const BASE_URL = `${request}${departureDays[0]}`;
    const MULTI_DEPART_URL = `${BASE_URL}&dateTo=${departureDays[1]}&typeFlight=single`;
    const SINGLE_DEPART_URL = `${BASE_URL}&typeFlight=single`;
    return departureDays.length > 2
      ? `${MULTI_DEPART_URL}`
      : `${SINGLE_DEPART_URL}`;
  }

  buildFlightPlan(
    departureLocation: string,
    arrivalLocation: string,
    departureDates: string[],
    returnDates?: string[]
  ): FlightDetails {
    return {
      from: departureLocation,
      to: arrivalLocation,
      departures: departureDates,
      returns: returnDates ? returnDates : undefined,
      type: 'return'
    };
  }

  autoCompleteFlightDestination(selectLocation: any): any {
    return this.getLocation(selectLocation.name).subscribe(location => {
      return location.id;
    });
  }

  createFlightCoordinates(routes: any): any {
    return routes.map(route => {
      return { lat: route.latFrom, lng: route.lngFrom };
    });
  }
}
