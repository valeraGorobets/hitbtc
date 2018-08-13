import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InvestingModule } from '../investing-module/investing.module';

import {
  MatProgressBarModule,
  MatButtonModule,
} from '@angular/material/';
import { ChartComponent } from './chart/chart.component';
import { TraidingViewComponent } from './traiding-view/traiding-view.component';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
