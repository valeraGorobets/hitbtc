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

import { InjectableObservablesService } from '../services/injectable-observables.service';
import { OrderTableComponent } from './order-table/order-table.component';
import { CurrencyComponent } from './currency/currency.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    TradingViewComponent,
    OrderTableComponent,
    CurrencyComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InvestingModule,
    MatProgressBarModule, MatButtonModule, MatTableModule
  ],
  providers: [InjectableObservablesService],
  bootstrap: [AppComponent],
})
export class AppModule { }
