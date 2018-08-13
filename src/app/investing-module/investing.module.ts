import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategyService } from './strategy.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [StrategyService],
})
export class InvestingModule { }
