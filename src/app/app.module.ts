import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './app-routes.modules';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchResultsComponent } from './search-results/search-results.components';

// services
import { FlightCheckService } from './shared/services/flight-check.service';
import { FlightPathService } from './shared/services/flight-path.service';
import { DashboardService } from './dashboard/dashboard.service';
import { SearchResultService } from './search-results/search-result.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule, RoutingModule, FormsModule, HttpClientModule
  ],
  providers: [FlightCheckService, FlightPathService, DashboardService, SearchResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
