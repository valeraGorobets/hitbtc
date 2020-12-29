import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InvestingService } from './investing.service';

@NgModule({
	imports: [
		CommonModule,
	],
	providers: [
		InvestingService,
	],
})
export class InvestingModule {
}
