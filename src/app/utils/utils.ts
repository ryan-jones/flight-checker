import { Destination } from '../shared/models/flights.model';

export const removeLocation = (locations: Destination[], locationInput: Destination): Destination[] =>
  locations.filter(savedLocation => savedLocation !== locationInput);

export const setDates = (dates: string[]): string[] => dates.filter(date => date);

export const encodeUrl = (flights: string[]): string[] => flights.map(flight => encodeURIComponent(flight));
