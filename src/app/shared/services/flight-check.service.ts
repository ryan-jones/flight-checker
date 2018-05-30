import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
  FlightDetails,
  FlightCheckResponse,
  FlightCoordinates
} from '../models/flights.model';
import { encodeUrl } from '../../utils/utils';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FlightCheckService {

  private locationURL = 'https://locations.skypicker.com';
  private apiURL = 'https://api.skypicker.com/flights';

  constructor(private http: HttpClient) {}

  public getLocation(location: string): Observable<any> {
    return this.http.get(`${this.locationURL}/?term=${location}`).map((res: FlightCheckResponse) => res.locations[0]);
  }

  public getFlights(flight: FlightDetails, stopovers: number): Observable<any> {

    let params = new HttpParams();
    params = params.append('flyFrom', `${flight.from}`);
    params = params.append('curr', `${flight.currency}`);
    params = this.checkStopovers(stopovers, params);
    params = this.setPriceLimit(flight, params);
    const BASE_URL = `${this.apiURL}?flyFrom=${flight.from}`;
    if (!flight.to && !flight.departures) {
      console.log('no to or departures');
      return this.http.get(`${this.apiURL}`, { params });
    } else {
      params = this.setUrlParams(flight, BASE_URL, params);
      return this.http.get(`${this.apiURL}`, { params });
    }
  }

  public checkStopovers(stopovers: number, params: HttpParams): HttpParams {
    if (stopovers === 0) {
      params = params.append('directFlights', '1');
    } else {
      params = params.append('directFlights', '0');
      params = params.append('maxstopovers', `${stopovers}`);
    }
    return params;
  }

  public setPriceLimit(flight: FlightDetails, params: HttpParams): HttpParams {
    if (flight.priceLimit) {
      params = params.append('price_to', `${flight.priceLimit}`);
    }
    return params;
  }

  public setUrlParams(flight: FlightDetails, BASE_URL: string, params: HttpParams): HttpParams {
    params = this.addFlightToParams(flight, BASE_URL, params);
    const departureDays = (flight.departures);
    params = params.append('dateFrom', `${departureDays[0]}`);
    const returnDays = flight.returns || '';
    return returnDays ? this.setReturnParams(params, departureDays, returnDays) : this.setOnewayParams(params, departureDays);
  }

  public addFlightToParams(flight: FlightDetails, BASE_URL: string, params: HttpParams) {
    if (flight.to) {
      params = params.append('to', `${flight.to}`);
    }
    return params;
  }
  public setReturnParams(params: HttpParams, departureDays: string[], returnDays: string[]): HttpParams {
    params = params.append('typeFlight', 'round');
    params = params.append('returnFrom', `${returnDays[0]}`);

    // tslint:disable-next-line:max-line-length
    return (departureDays.length > 1) ? this.setReturnDatesUrl(returnDays, params) : this.setReturnDatesUrl(returnDays, params);
  }

  public setReturnDatesUrl(returnDays: string[], params: HttpParams): HttpParams {

    if (returnDays.length > 2) {
      params = params.append('returnTo', `${returnDays[1]}`);
    }
    return params;
  }

  public setOnewayParams(params: HttpParams, departureDays: string[]): HttpParams {
    params = params.append('typeFlight', 'oneway');
    if (departureDays.length > 2) {
      params = params.append('dateTo', `${departureDays[1]}`);
    }
    return params;
  }

  public buildFlightPlan(
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

  public autoCompleteFlightDestination = (selectLocation: any): Subscription => this.getLocation(selectLocation.name).subscribe(location => location.id);

  public createFlightCoordinates = (routes: any): FlightCoordinates[] => routes.map(route => ({ lat: route.latFrom, lng: route.lngFrom }));
}
