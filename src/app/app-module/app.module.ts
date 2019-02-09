import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatProgressBarModule,
  MatButtonModule,
  MatTableModule,
} from '@angular/material/';

import { AppRoutingModule } from './app-routing.module';
import { InvestingModule } from '../investing-module/investing.module';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { TradingViewComponent } from './trading-view/trading-view.component';

import { InjectableObservables } from './injectable-observables';
import { OrderTableComponent } from './order-table/order-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    TradingViewComponent,
    OrderTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InvestingModule,
    MatProgressBarModule, MatButtonModule, MatTableModule
  ],
  providers: [InjectableObservables],
  bootstrap: [AppComponent],
})
export class AppModule { }
