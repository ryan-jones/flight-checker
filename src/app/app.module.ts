import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './app-routes.modules';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchResultsComponent } from './components/search-results/search-results.components';
import { FlightRoutesComponent } from './components/flight-routes/flight-routes.component';
import { FlightCheckerComponent } from './components/flight-checker/flight-checker.component';
import { CurrencyPriceLimitComponent } from './components/currency-price-limit/currency-price-limit.component';

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
    FlightCheckerComponent,
    CurrencyPriceLimitComponent
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
