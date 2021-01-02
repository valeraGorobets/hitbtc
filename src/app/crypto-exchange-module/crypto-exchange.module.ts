import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HitBTCApi } from './hitbtc-api.service';

@NgModule({
	imports: [
		CommonModule,
	],
	providers: [
		HitBTCApi,
	],
	exports: [],
})
export class CryptoExchangeModule {
}
