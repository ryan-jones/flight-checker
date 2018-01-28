import { Injectable } from '@angular/core';

declare const google;

@Injectable()
export class FlightCheckerViewService {
  public buildAutocomplete = (input): any =>
    new google.maps.places.Autocomplete(input);

  public formatSelectDates = (dates: string[]): string[] =>
    (dates = dates.map(date => (date ? this.formatDate(date) : date)));

  public formatDate(date: string): string {
    const newDate = new Date(date);
    const month =
      newDate.getMonth() <= 8
        ? `0${newDate.getMonth() + 1}`
        : `${newDate.getMonth() + 1}`;

    const convertedDates = `${newDate.getDate()}/${month}/${newDate.getFullYear()}`;
    return convertedDates;
  }

  public setDepartureDates = (dates: string[]): string[] =>
    dates.splice(0, 2).filter(date => {
      if (date) {
        return date;
      }
    })

  public setReturnDates = (dates: string[]): string[] =>
    dates.filter(date => {
      if (date) {
        return date;
      }
    })
}
