import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HitbtcApiService } from './hitbtc-api.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [HitbtcApiService],
  exports: [HitbtcApiService],
})
export class CryptoExchangeModule { }
