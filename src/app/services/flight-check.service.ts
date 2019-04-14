import { Injectable } from "@angular/core";
import {
  FlightDetails,
  FlightCheckResponse,
  FlightCoordinates
} from "../models/flights.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class FlightCheckService {
  private locationURL = "https://locations.skypicker.com";
  private apiURL = "https://api.skypicker.com/flights";

  constructor(private http: HttpClient) {}

  public getLocation(location: string): Observable<any> {
    return this.http
      .get(`${this.locationURL}/?term=${location}`)
      .pipe(map((res: FlightCheckResponse) => res.locations[0]));
  }

  public getFlights(flight: FlightDetails, stopovers: number): Observable<any> {
    let params = this.setBaseParams(flight, stopovers);

    if (flight.to && flight.departures) {
      params = this.setAdditionalParams(flight, params);
    }
    return this.http.get(`${this.apiURL}`, { params });
  }

  private setBaseParams(flight: FlightDetails, stopovers: number): HttpParams {
    let params = new HttpParams()
      .append("flyFrom", `${flight.from}`)
      .append("curr", `${flight.currency}`);
    params = this.setStopoverParams(stopovers, params);
    params = this.setPriceLimitParams(flight, params);
    return params;
  }

  private setStopoverParams(stopovers: number, params: HttpParams): HttpParams {
    if (stopovers === 0) {
      params = params.append("directFlights", "1");
    } else {
      params = params
        .append("directFlights", "0")
        .append("maxstopovers", `${stopovers}`);
    }
    return params;
  }

  private setPriceLimitParams(
    flight: FlightDetails,
    params: HttpParams
  ): HttpParams {
    return flight.priceLimit
      ? params.append("price_to", `${flight.priceLimit}`)
      : params;
  }

  private setAdditionalParams(
    flight: FlightDetails,
    params: HttpParams
  ): HttpParams {
    const departureDays = flight.departures;
    if (departureDays.length) {
      params = params.append("dateFrom", `${departureDays[0]}`);
    }
    params = this.addFlightToParams(flight, params);
    return flight.returns
      ? this.setReturnParams(params, flight.returns)
      : this.setOnewayParams(params, departureDays);
  }

  private addFlightToParams(flight: FlightDetails, params: HttpParams) {
    return flight.to ? params.append("to", `${flight.to}`) : params;
  }

  private setReturnParams(
    params: HttpParams,
    returnDays: string[]
  ): HttpParams {
    params = params
      .append("typeFlight", "round")
      .append("returnFrom", `${returnDays[0]}`);

    if (returnDays.length > 2) {
      params = params.append("returnTo", `${returnDays[1]}`);
    }
    return params;
  }

  private setOnewayParams(
    params: HttpParams,
    departureDays: string[]
  ): HttpParams {
    params = params.append("typeFlight", "oneway");
    if (departureDays.length > 2) {
      params = params.append("dateTo", `${departureDays[1]}`);
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
      type: "return",
      priceLimit: priceLimit ? priceLimit : undefined,
      currency
    };
  }

  public autoCompleteFlightDestination = (selectLocation: any): Subscription =>
    this.getLocation(selectLocation.name).subscribe(location => location.id);

  public createFlightCoordinates = (routes: any): FlightCoordinates[] =>
    routes.map(route => ({ lat: route.latFrom, lng: route.lngFrom }));
}
