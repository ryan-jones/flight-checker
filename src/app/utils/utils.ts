import { Destination } from '../shared/models/flights.model';

export function removeLocation(
  locations: Destination[],
  locationInput: Destination
): Destination[] {
  return locations.filter(savedLocation => {
    return savedLocation !== locationInput;
  });
}

export function setDates(dates: string[]): string[] {
  const settledDates = [];
  dates.forEach(date => {
    if (date) {
      settledDates.push(date);
    }
  });
  return settledDates;
}

export function encodeUrl(flights: string[]): string[] {
  return flights.map(flight => encodeURIComponent(flight));
}
