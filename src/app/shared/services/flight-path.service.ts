import { Injectable } from '@angular/core';
import { GoogleFlightPath, Export, Destination } from '../models/flights.model';
import { Coordinate, GoogleMap } from '../models/map.model';
import { removeLocation } from '../../utils/utils';

declare const google;

@Injectable()
export class FlightPathService {
  private map: GoogleMap;
  private geocoder = new google.maps.Geocoder();
  private destinationCoordinates: Coordinate[] = [];
  private flightPathData = new google.maps.Polyline;
  private itineraryPath: any[] = [];

  public setGeocodeMarkers(data: Export, map: GoogleMap): void {
    if (data) {
      this.map = map;
      this.buildflightPath(this.geocoder, data);
    }
  }

  public buildflightPath(geocoder: any, data: Export): void {
    const point = data.point;
    geocoder.geocode({ address: data.name }, (results, status) => {
      if (status === 'OK') {
        this.createflightPath(point);
      }
    });
  }

  public createflightPath(point: Coordinate): void {
    this.destinationCoordinates.push(point);
    this.flightPathData = this.setPolyline(this.destinationCoordinates);
    this.itineraryPath.push(this.flightPathData);
    this.flightPathData.setMap(this.map);
  }

  public setPolyline(destinationCoordinates: Coordinate[]): GoogleFlightPath {
    return new google.maps.Polyline({
      path: destinationCoordinates,
      geodesic: true,
      strokeColor: 'yellow',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
  }

  public clearPolylines(): void {
    this.itineraryPath.forEach(flightPathData => flightPathData.setMap(null));
    this.itineraryPath = [];
  }
}
