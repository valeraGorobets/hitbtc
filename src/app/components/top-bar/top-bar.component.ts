import { Component } from '@angular/core';
import { InjectableObservablesService } from '../../services/injectable-observables.service';
import { CurrencyBalance } from '../../models/CurrencyBalance';

@Component({
  selector: 'top-bar',
  styleUrls: ['./top-bar.component.less'],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  public balanceList: CurrencyBalance[] = [];

  constructor(
    private injectableObservables: InjectableObservablesService,
  ) {
    injectableObservables.balance$.subscribe((balanceUpdate: CurrencyBalance[]) => this.handleBalanceUpdate(balanceUpdate));
  }

  private handleBalanceUpdate(balance: CurrencyBalance[] ): void {
    this.balanceList = balance;
  }

}
