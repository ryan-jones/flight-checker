import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './app-routes.modules';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchResultsComponent } from './search-results/search-results.components';
import { FlightRoutesComponent } from './flight-routes/flight-routes.component';
import { FlightCheckerComponent } from './flight-checker/flight-checker.component';

// services
import { FlightCheckService } from './services/flight-check.service';
import { FlightPathService } from './services/flight-path.service';
import { DashboardService } from './services/dashboard.service';
import { FlightCheckerViewService } from './services/flight-checker.service';
import { SearchResultsService } from './services/search-results.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    SearchResultsComponent,
    FlightRoutesComponent,
    FlightCheckerComponent
  ],
  imports: [BrowserModule, RoutingModule, FormsModule, HttpClientModule],
  providers: [
    FlightCheckService,
    FlightPathService,
    DashboardService,
    FlightCheckerViewService,
    SearchResultsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
