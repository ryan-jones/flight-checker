import { Destination } from '../shared/models/flights.model';

declare const google;

export function initialInfoWindow(
  marker: any,
  name: string,
  country: string,
  infowindow: any,
  map: any
) {
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(
      `<div><h3> Starting in ${name}, ${country} </h3></div>`
    );
    infowindow.open(map, this);
  });
}

export function supplementaryInfoWindow(
  marker: any,
  name: string,
  country: string,
  infowindow: any,
  map: any,
  days: number,
  date: string,
  transport: string,
  price: number
) {
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(
      `<div><h3> Location: ${name}, ${country} </h3></div><div><p><strong>Arriving on Day </strong> ${days} <strong> of the trip </strong></p></div> <div><p><strong>Arriving on </strong> ${date}  via  <i>${transport}</i> </p></div><div><p><strong>Price: </strong>  ${price} per person  </p></div> `
    );
    infowindow.open(map, this);
  });
}

export function removeLocation(
  locations: Destination[],
  locationInput: Destination
): Destination[] {
  return locations.filter(savedLocation => {
    return savedLocation !== locationInput;
  });
}
