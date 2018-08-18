import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoExchangeModule } from '../crypto-exchange-module/crypto-exchange.module';
import { TradingService } from './trading.service';

@NgModule({
  imports: [
    CommonModule,
    CryptoExchangeModule,
  ],
  providers: [TradingService],
})
export class TradeModule { }
