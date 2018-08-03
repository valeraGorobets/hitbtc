import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoExchangeModule } from '../crypto-exchange-module/crypto-exchange.module';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [CryptoExchangeModule],
})
export class TradeModule { }
