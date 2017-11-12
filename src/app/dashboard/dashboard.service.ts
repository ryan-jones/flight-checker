import { Injectable } from '@angular/core';
import { MapOptions, MapStyles } from '../shared/models/map.model';

let map;
declare const google;

@Injectable()
export class DashboardService {
  public setMap(): any {
    const myOptions = new MapOptions();
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    const styles = new MapStyles();
    map.setOptions({ styles: styles });
    return map;
  }

  public buildAutocomplete(input): any {
    return new google.maps.places.Autocomplete(input);
  }

  public formatSelectDates(dates: string[]): string[] {
    return (dates = dates.map(date => {
      return this.formatDate(date);
    }));
  }

  public formatDate(date: string): string {
    const newDate = new Date(date);
    const month =
      newDate.getMonth() <= 8
        ? `0${newDate.getMonth() + 1}`
        : `${newDate.getMonth() + 1}`;

    const convertedDates = `${newDate.getDate()}/${month}/${newDate.getFullYear()}`;
    return convertedDates;
  }

  public setDepartureDates(dates: string[]): string[] {
    switch (dates.length) {
      case 0:
        return;
      case 1:
        return [dates[0]];
      case 2:
      case 3:
        return dates[1] ? [dates[0], dates[1]] : [dates[0]];
      case 4:
        return [dates[0], dates[1]];
    }
  }

  public setReturnDates(dates: string[]): string[] {
    switch (dates.length) {
      case 0:
      case 1:
      case 2:
        return;
      case 3:
        return [dates[2]];
      case 4:
        return [dates[2], dates[3]];
    }
  }

}
