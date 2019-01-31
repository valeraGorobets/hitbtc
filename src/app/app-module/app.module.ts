import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatProgressBarModule,
  MatButtonModule,
} from '@angular/material/';

import { AppRoutingModule } from './app-routing.module';
import { InvestingModule } from '../investing-module/investing.module';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { TradingViewComponent } from './trading-view/trading-view.component';

import { InjectableObservables } from './injectable-observables';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    TradingViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InvestingModule,
    MatProgressBarModule, MatButtonModule,
  ],
  providers: [InjectableObservables],
  bootstrap: [AppComponent],
})
export class AppModule { }
