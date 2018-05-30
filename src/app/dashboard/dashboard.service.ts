import { Injectable } from '@angular/core';
import { MapStyles, MapOptions, GoogleMap } from '../shared/models/map.model';

let map;
declare const google;

@Injectable()
export class DashboardService {

  public setMap(): GoogleMap {
    const myOptions = new MapOptions();
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    const styles = new MapStyles();
    map.setOptions({ styles: styles });
    return map;
  }
}
