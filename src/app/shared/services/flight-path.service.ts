import { Injectable } from '@angular/core';
import { GoogleFlightPath, Export, Destination } from '../models/flights.model';
import { Coordinate } from '../models/map.model';
import { removeLocation } from '../../utils/utils';

declare const google;

@Injectable()
export class FlightPathService {
  private map: any;
  private geocoder = new google.maps.Geocoder();
  private destinationCoordinates: Coordinate[] = [];
  private flightPathData: any;
  private itineraryPath: any[] = [];
  private locations: any[] = [];

  setGeocodeMarkers(data: Export, map: any) {
    if (data) {
      this.map = map;
      this.buildflightPath(this.geocoder, data);
    }
  }

  buildflightPath(geocoder: any, data: Export) {
    const point = data.point;
    geocoder.geocode({ address: data.name }, (results, status) => {
      if (status === 'OK') {
        this.createflightPath(point);
      }
    });
  }

  createflightPath(point: Coordinate) {
    this.destinationCoordinates.push(point);
    this.flightPathData = this.setPolyline(this.destinationCoordinates);
    this.itineraryPath.push(this.flightPathData);
    this.flightPathData.setMap(this.map);
  }

  setPolyline(destinationCoordinates: Coordinate[]): GoogleFlightPath {
    return new google.maps.Polyline({
      path: destinationCoordinates,
      geodesic: true,
      strokeColor: 'yellow',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
  }

  clearPolylines() {
    this.itineraryPath.forEach(flightPathData => {
      flightPathData.setMap(null);
    });
    this.itineraryPath = [];
  }
}
