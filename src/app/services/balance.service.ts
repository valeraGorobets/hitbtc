import { Injectable } from '@angular/core';
import { InjectableObservablesService } from './injectable-observables.service';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { CurrencyBalance } from '../models/CurrencyBalance';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private balanceList: CurrencyBalance[] = [];

  constructor(
    private injectableObservables: InjectableObservablesService,
    private hitBTCApiService: HitBTCApi,
  ) {
    this.injectableObservables.config$.subscribe(() => this.onConfigUpdate());
    // setInterval(() => {
    //   const newobj = this.balanceList;
    //   let v = +newobj[4].available;
    //   v += 1;
    //   newobj[4].available = v.toString();
    //   this.updateBalanceList(newobj);
    // }, 2000);
  }

  private onConfigUpdate(): void {
    this.hitBTCApiService.getBalance().subscribe((balanceValues: CurrencyBalance[]) => this.updateBalanceList(balanceValues));
  }

  public updateBalanceList(newBalance: CurrencyBalance[]): void {
    this.balanceList = newBalance.sort((value1, value2) => +value2.available - +value1.available);
    this.notifyAboutNewBalanceValue();
  }

  public notifyAboutNewBalanceValue(): void {
    this.injectableObservables.balance$.next(this.balanceList);
  }
}
