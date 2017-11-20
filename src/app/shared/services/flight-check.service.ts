import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { FlightDetails, FlightCheckResponse } from '../models/flights.model';
import { encodeUrl } from '../../utils/utils';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlightCheckService {
  constructor(private http: HttpClient) {}

  public getLocation(location: string) {
    return this.http
      .get(`https://locations.skypicker.com/?term=${location}`)
      .map((res: FlightCheckResponse) => res.locations[0]);
  }

  public getFlights(flight: FlightDetails, stopovers: number) {
    const urlParams = this.setParams(stopovers);
    const priceLimits = this.setPriceLimit(flight);
    const BASE_URL = `https://api.skypicker.com/flights?flyFrom=${flight.from}`;
    if (!flight.to && !flight.departures) {
      return this.http.get(`${BASE_URL}${priceLimits}${urlParams}&curr=${flight.currency}`);
    } else {
      const url = this.setUrl(flight, BASE_URL);
      return this.http.get(`${url}${priceLimits}${urlParams}&curr=${flight.currency}`);
    }
  }

  public setParams(stopovers: number): string {
    return stopovers === 0
      ? `&directFlights=1`
      : `&directFlights=0&maxstopovers=${stopovers}`;
  }

  public setPriceLimit(flight: FlightDetails): string {
    return flight.priceLimit ? `&price_to=${flight.priceLimit}` : '';
  }

  public setUrl(flight: FlightDetails, BASE_URL: string): string {
    const request = this.setRequestUrl(flight, BASE_URL);
    const departureDays = encodeUrl(flight.departures);
    const returnDays = flight.returns ? encodeUrl(flight.returns) : '';
    return returnDays
      ? this.setReturnUrl(request, departureDays, returnDays)
      : this.setOnewayUrl(request, departureDays);
  }

  public setRequestUrl(flight: FlightDetails, BASE_URL: string) {
    return flight.to
      ? `${BASE_URL}&to=${flight.to}&dateFrom=`
      : `${BASE_URL}&dateFrom=`;
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
    const MULTI_DEPART_URL = `${BASE_URL}&dateTo=${departureDays[1]}&typeFlight=oneway`;
    const SINGLE_DEPART_URL = `${BASE_URL}&typeFlight=oneway`;
    return departureDays.length > 2
      ? `${MULTI_DEPART_URL}`
      : `${SINGLE_DEPART_URL}`;
  }

  buildFlightPlan(
    departureLocation: string,
    arrivalLocation: string,
    departureDates: string[],
    currency: string,
    returnDates?: string[],
    priceLimit?: number
  ): FlightDetails {
    return {
      from: departureLocation,
      to: arrivalLocation,
      departures: departureDates,
      returns: returnDates.length ? returnDates : undefined,
      type: 'return',
      priceLimit: priceLimit ? priceLimit : undefined,
      currency
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
