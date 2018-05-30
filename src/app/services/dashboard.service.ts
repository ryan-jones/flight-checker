import { Injectable } from '@angular/core';
import { GoogleMap, MapOptions, MapStyles } from '../models/map.model';

declare const google;

@Injectable()
export class DashboardService {

  public setMap(): GoogleMap {
    const myOptions = new MapOptions();
    const map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    const styles = new MapStyles();
    map.setOptions({ styles: styles });
    return map;
  }
}
