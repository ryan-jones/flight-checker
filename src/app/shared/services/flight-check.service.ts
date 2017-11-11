import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { FlightDetails } from '../models/flights.model';

@Injectable()
export class FlightCheckService {
  BASE_URL: string = `https://api.skypicker.com/flights?v=2&locale=en&flyFrom=`;

  constructor(private http: Http) {}

  getLocation(location) {
    return this.http
      .get(`https://api.skypicker.com/places?term=${location}&v=2&locale=en`)
      .map(res => res.json())
      .map(res => {
        return res[0];
      });
  }

  getFlights(flight: FlightDetails) {
    const departureDays = [];
    const returnDays = [];
    let request = `${this.BASE_URL}${flight.from}&to=${flight.to}&dateFrom=`;

    flight.departures.forEach(departure => {
      const departureDate = encodeURIComponent(departure);
      departureDays.push(departureDate);
    });

    flight.returns.forEach(flight => {
      const returnDate = encodeURIComponent(flight);
      returnDays.push(returnDate);
    });

    if (flight.type === 'return') {
      if (departureDays.length === 2 && returnDays.length < 2) {
        request = `${request}${departureDays[0]}&dateTo=${departureDays[1]}&typeFlight=return&returnFrom=${returnDays[0]}`;
      } else if (departureDays.length === 2 && returnDays.length === 2) {
        request = `${request}${departureDays[0]}&dateTo=${departureDays[1]}&typeFlight=return&returnFrom=${returnDays[0]}&returnTo=${returnDays[1]}`;
      } else if (departureDays.length < 2 && returnDays.length < 2) {
        request = `${request}${departureDays[0]}&typeFlight=return&returnFrom=${returnDays[0]}`;
      } else {
        request = `${request}${departureDays[0]}&typeFlight=return&returnFrom=${returnDays[0]}&returnTo=${returnDays[1]}`;
      }
    }
    return this.http.get(request).map(res => res.json());
  }

  buildFlightPlan(
    departureLocation,
    arrivalLocation,
    departureDates,
    returnDates
  ): FlightDetails {
    return {
      from: departureLocation,
      to: arrivalLocation,
      departures: departureDates,
      returns: returnDates,
      type: 'return'
    };
  }

  autoCompleteFlightDestination(selectLocation): any {
    return this.getLocation(selectLocation.name).subscribe(location => {
      return location.id;
    });
  }

  createFlightCoordinates(routes): any {
    return routes.map(route => {
      return { lat: route.latFrom, lng: route.lngFrom };
    });
  }
}
