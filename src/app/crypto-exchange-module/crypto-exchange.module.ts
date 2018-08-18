import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HitbtcApi } from './hitbtc-api';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [HitbtcApi],
  exports: [],
})
export class CryptoExchangeModule { }
