import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatProgressBarModule,
  MatButtonModule,
} from '@angular/material/';

import { AppRoutingModule } from './app-routing.module';
import { InvestingModule } from '../investing-module/investing.module';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { TraidingViewComponent } from './traiding-view/traiding-view.component';

import { InjectableObservables } from './injectable-observables';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    TraidingViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InvestingModule,
    MatProgressBarModule, MatButtonModule,
  ],
  providers: [InjectableObservables],
  bootstrap: [AppComponent],
})
export class AppModule { }
