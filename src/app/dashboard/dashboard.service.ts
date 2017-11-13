import { Injectable } from '@angular/core';
import { MapStyles, MapOptions } from '../shared/models/map.model';

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
      return date ? this.formatDate(date) : date;
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
    const newDates = dates.splice(0, 2);
    const departureDates = [];
    newDates.forEach(date => {
      if (date) {
        departureDates.push(date);
      }
    });
    return departureDates;
  }

  public setReturnDates(dates: string[]): string[] {
    const newDates = dates.splice(2, 4);
    const returnDates = [];
    newDates.forEach(date => {
      if (date) {
        returnDates.push(date);
      }
    });
    return returnDates;
  }
}
