import { Injectable } from '@angular/core';
import { InjectableObservablesService } from './injectable-observables.service';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { CurrencyBalance } from '../models/CurrencyBalance';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Symbol } from '../models/Symbol';
import { Report } from '../models/Report';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private balanceList: CurrencyBalance[] = [];
  private requiredCurrencies: string[] = [];

  constructor(
    private injectableObservables: InjectableObservablesService,
    private hitBTCApiService: HitBTCApi,
  ) {
    // setTimeout(() => this.subscribeGetTradingBalance(), 5000);
    // this.injectableObservables.report$.subscribe((reportUpdate: Report[]) => this.handleReportUpdate(reportUpdate));
    combineLatest(
      this.injectableObservables.config$,
      this.injectableObservables.report$,
    ).subscribe(([config, _report]) => {
      this.requiredCurrencies = Object.values((config as any).symbolInfo)
        .reduce((array: string[], symbolInfo: Symbol ) => [...array, symbolInfo.baseCurrency, symbolInfo.quoteCurrency], []) as any[];
      this.hitBTCApiService.getTradingBalance()
      .subscribe((newBalance: CurrencyBalance[]) => this.updateBalanceValues(newBalance));
    });
  }

  private subscribeGetTradingBalance(): void {
    this.hitBTCApiService.subscribeGetTradingBalance();

    combineLatest(
      this.injectableObservables.config$,
      this.hitBTCApiService.onMessage('getTradingBalance'),
    ).pipe(
      filter(([_config, balance]) => Array.isArray((balance as any).result)),
    ).subscribe(([config, balance]) => {
      this.requiredCurrencies = Object.values((config as any).symbolInfo)
        .reduce((array: string[], symbolInfo: Symbol ) => [...array, symbolInfo.baseCurrency, symbolInfo.quoteCurrency], []) as any[];
      this.updateBalanceValues(balance);
    });
  }

  private updateBalanceValues(balance: any): void {
    const balanceValues = balance.filter((currency: CurrencyBalance) =>
        !!(this.requiredCurrencies.includes(currency.currency) || +currency.available || +currency.reserved));
    console.log('updateBalanceList');
    console.log(balanceValues);
    this.updateBalanceList(balanceValues);
  }

  public updateBalanceList(newBalance: CurrencyBalance[]): void {
    this.balanceList = newBalance.sort((value1, value2) => +value2.available - +value1.available);
    this.notifyAboutNewBalanceValue();
  }

  public notifyAboutNewBalanceValue(): void {
    this.injectableObservables.balance$.next(this.balanceList);
  }
}
