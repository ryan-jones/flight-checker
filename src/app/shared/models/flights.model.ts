export interface FlightCheckResponse {
  locations: any[];
  meta: any;
}


export interface FlightDetails {
  departures: string[];
  from: string;
  returns: string[];
  to: string;
  type: string;
  priceLimit: number;
  currency: string;
}

export interface SearchResult {
  all_airlines: string[];
  all_stopover_airports: string[];
  connections: string[];
  currency: string;
  currency_rate: number;
  data: any[];
  del: number;
  ref_tasks: any;
  refresh: any[];
  search_params: {
    flyFrom_type: string;
    to_type: string;
    seats: {
      infants: number;
      passengers: number;
      adults: number;
      children: number;
    };
  };
  time: number;
  _results: number;
}

export interface GoogleFlightPath {
  '_.Mg': {
    gm_accessors_: any;
    gm_bindings_: any;
    latLngs: any;
    map: any;
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    visible: boolean;
    geodesic: boolean;
  };
}

export interface Export {
  name: string;
  date: any;
  days: any;
  details: {
    note: any;
    expense: number;
    transport: string;
  };
  transport: string;
  country: any;
  price: any;
  point: {
    lat: any;
    lng: any;
  };
}

export class Destination {
  geoLocation: any;
  date: string;
  days: number;
  transport: string;
  country: string;
  currency: string;
  details: any;
  price: number;

  constructor() {
    (this.geoLocation = ''),
      (this.date = ''),
      (this.transport = 'plane'),
      (this.country = ''),
      (this.currency = '$'),
      (this.details = ''),
      (this.price = null),
      (this.days = 0)
  }
}
