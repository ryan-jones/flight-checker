import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SearchResults } from '../../search-results/search-results.model';

@Injectable()
export class SearchResultsService {
  public searchResults: SearchResults;

  setSearchResults = (searchResult: SearchResults) => this.searchResults = searchResult;
}
