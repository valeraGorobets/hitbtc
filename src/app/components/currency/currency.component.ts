import { Component, Input } from '@angular/core';
import { CurrencyBalance } from '../../models/CurrencyBalance';

@Component({
	selector: 'app-currency',
	templateUrl: './currency.component.html',
	styleUrls: ['./currency.component.less'],
})
export class CurrencyComponent {
	@Input() public currencyBalance: CurrencyBalance;
}
