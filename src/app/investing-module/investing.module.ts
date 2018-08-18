import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategyService } from './strategy.service';

import { TradeModule } from '../trade-module/trade.module';

@NgModule({
  imports: [
    CommonModule,
    TradeModule,
  ],
  providers: [StrategyService],
})
export class InvestingModule { }
