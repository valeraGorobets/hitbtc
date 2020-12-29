import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatProgressBarModule, MatTableModule } from '@angular/material/';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartComponent } from '../components/chart/chart.component';
import { CurrencyComponent } from '../components/currency/currency.component';
import { OrderTableComponent } from '../components/order-table/order-table.component';
import { TopBarComponent } from '../components/top-bar/top-bar.component';
import { TradingViewComponent } from '../components/trading-view/trading-view.component';
import { InvestingModule } from '../investing-module/investing.module';
import { InjectableObservablesService } from '../services/injectable-observables.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
		MatProgressBarModule,
		MatButtonModule,
		MatTableModule,
	],
	providers: [InjectableObservablesService],
	bootstrap: [AppComponent],
})
export class AppModule {
}
