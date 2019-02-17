import { Injectable } from '@angular/core';
import { InjectableObservablesService } from './injectable-observables.service';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { CurrencyBalance } from '../models/CurrencyBalance';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Symbol } from '../models/Symbol';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private balanceList: CurrencyBalance[] = [];

  constructor(
    private injectableObservables: InjectableObservablesService,
    private hitBTCApiService: HitBTCApi,
  ) {
    setTimeout(() => this.subscribeGetTradingBalance(), 5000);
  }

  private subscribeGetTradingBalance(): void {
    this.hitBTCApiService.subscribeGetTradingBalance();

    combineLatest(
      this.injectableObservables.config$,
      this.hitBTCApiService.onMessage('getTradingBalance'),
    ).pipe(
      filter(([_config, balance]) => Array.isArray((balance as any).result)),
    ).subscribe(([config, balance]) => {
      const requiredCurrencies = Object.values((config as any).symbolInfo)
        .reduce((array: string[], symbolInfo: Symbol ) => [...array, symbolInfo.baseCurrency, symbolInfo.quoteCurrency], []) as any[];
      const balanceValues = (balance as any).result.filter((currency: CurrencyBalance) =>
        !!(requiredCurrencies.includes(currency.currency) || +currency.available || +currency.reserved));
      console.log('updateBalanceList');
      console.log(balanceValues);
      this.updateBalanceList(balanceValues);
    });
  }

  public updateBalanceList(newBalance: CurrencyBalance[]): void {
    this.balanceList = newBalance.sort((value1, value2) => +value2.available - +value1.available);
    this.notifyAboutNewBalanceValue();
  }

  public notifyAboutNewBalanceValue(): void {
    this.injectableObservables.balance$.next(this.balanceList);
  }
}
