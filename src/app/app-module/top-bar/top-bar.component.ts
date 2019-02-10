import { Component } from '@angular/core';
import { InjectableObservables } from '../injectable-observables';
import { IBalance } from '../../services/money-manager.service';

@Component({
  selector: 'top-bar',
  styleUrls: ['./top-bar.component.less'],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  public balance: IBalance[] = [];

  constructor(
    private injectableObservables: InjectableObservables,
  ) {
    injectableObservables.balance$.subscribe((balanceUpdate: IBalance[]) => this.handleBalanceUpdate(balanceUpdate));
  }

  private handleBalanceUpdate(balance: IBalance[] ): void {
    this.balance = balance;
  }

}
