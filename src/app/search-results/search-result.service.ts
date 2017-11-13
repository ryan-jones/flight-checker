import { Injectable } from '@angular/core';
import { MapStyles, MapOptions } from '../shared/models/map.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SearchResultService {
  constructor(private http: HttpClient) {}

  getDestinationImage(destination: string) {
    const header = new HttpHeaders().set('Api-Key', 'ycvdmzhh8zmzwhw7zervuh87');
    return this.http.get(
      // tslint:disable-next-line:max-line-length
      `https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=most_popular&phrase=${destination}`,
      { headers: header }
    ).map(res => this.getResultImage(res));
  }


  getResultImage(res) {
    console.log('res', res)
    return res.images[0].referral_destinations[0].uri;
  }
}
