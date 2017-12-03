import { Injectable } from '@angular/core';

declare const google;

@Injectable()
export class FlightCheckerViewService {
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

    const convertedDates = `${newDate.getDate()}/${
      month
    }/${newDate.getFullYear()}`;
    return convertedDates;
  }

  public setDepartureDates(dates: string[]): string[] {
    const newDates = dates.splice(0, 2);
    return newDates.filter(date => {
      if (date) {
        return date;
      }
    });
  }

  public setReturnDates(dates: string[]): string[] {
    return dates.filter(date => {
      if (date) {
        return date;
      }
    });
  }
}
