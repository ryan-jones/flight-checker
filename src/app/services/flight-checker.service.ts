import { Injectable } from "@angular/core";

declare const google;

@Injectable()
export class FlightCheckerViewService {
  public buildAutocomplete = (input): any =>
    new google.maps.places.Autocomplete(input);

  public formatSelectDates = (dates: string[]): string[] =>
    dates.map(this.formatDate);

  public formatDate(date: string): string {
    const newDate = new Date(date);
    const month =
      newDate.getMonth() <= 8
        ? `0${newDate.getMonth() + 1}`
        : `${newDate.getMonth() + 1}`;
    return `${newDate.getDate()}/${month}/${newDate.getFullYear()}`;
  }
}
