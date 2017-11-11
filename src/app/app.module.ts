import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './app-routes.modules';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

// services
import { FlightCheckService } from './shared/services/flight-check.service';
import { FlightPathService } from './shared/services/flight-path.service';
import { DashboardService } from './dashboard/dashboard.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule, RoutingModule, FormsModule, HttpModule
  ],
  providers: [FlightCheckService, FlightPathService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
