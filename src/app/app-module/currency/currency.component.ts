import { Component, Input } from '@angular/core';
import { IBalance } from '../../services/money-manager.service';

@Component({
  selector: 'currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.less'],
})
export class CurrencyComponent {
  @Input() public balance: IBalance;
  constructor() { }

}
