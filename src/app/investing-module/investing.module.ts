import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestingService } from './investing.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [InvestingService],
})
export class InvestingModule { }
