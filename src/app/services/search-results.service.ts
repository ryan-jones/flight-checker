import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SearchResults } from '../models/search-results.model';

@Injectable()
export class SearchResultsService {
  public searchResults: SearchResults;

  public setSearchResults = (searchResult: SearchResults): SearchResults => this.searchResults = searchResult;
}
