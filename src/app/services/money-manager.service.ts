import { Injectable } from '@angular/core';
import { InjectableObservablesService } from './injectable-observables.service';
import { Side } from '../models/SharedConstants';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { Symbol } from '../models/Symbol';
import { zip } from 'rxjs';
import { CurrencyBalance } from '../models/CurrencyBalance';
import { distinctUntilChanged } from 'rxjs/operators';

interface IActionUpdate {
  symbolID: string;
  advisedResult: Side;
  timestamp: string;
}

export interface IMoneyUpdate extends IActionUpdate {
  amount: number;
}

@Injectable({
  providedIn: 'root',
})

export class MoneyManagerService {
  private config: any;
  private balance: CurrencyBalance[] = [];

  constructor(
    private injectableObservables: InjectableObservablesService,
    private hitBTCApiService: HitBTCApi,
  ) {
    injectableObservables.strategyAction$
      .pipe(distinctUntilChanged(),
    ).subscribe((actionUpdate: IActionUpdate) => this.handleActionUpdate(actionUpdate));
    injectableObservables.config$.subscribe((configUpdate: any) => this.handleConfigUpdate(configUpdate));
    injectableObservables.balance$.subscribe((balance: CurrencyBalance[]) => this.handleBalanceUpdate(balance));
  }

  private handleActionUpdate(actionUpdate: IActionUpdate): void {
    if (actionUpdate.advisedResult !== Side.none) {
      this.injectableObservables.moneyAction$.next({
        ...actionUpdate,
        amount: this.countAmountAvailableToPerform(actionUpdate),
      });
    }
  }

  private countAmountAvailableToPerform(actionUpdate: IActionUpdate): number {
    if (!this.balance.length) {
      return 0;
    }
    switch (actionUpdate.advisedResult) {
      case Side.buy:
        return this.config.symbolInfo[actionUpdate.symbolID].quantityIncrement;
        // return +this.balance.find(
        //   (balance: CurrencyBalance) => balance.currency === this.config.symbolInfo[actionUpdate.symbolID].quoteCurrency,
        // ).available * 0.5;
      case Side.sell:
        return +this.balance.find(
          (balance: CurrencyBalance) => balance.currency === this.config.symbolInfo[actionUpdate.symbolID].baseCurrency,
        ).available;
      default:
        return 0;
    }
  }

  private handleConfigUpdate(configUpdate: any): void {
    this.config = configUpdate;
    const arrayOfRequests = configUpdate.availableSymbolsForInvesting.map(symbol => {
      if (configUpdate.symbolInfo[symbol.id]) {
        return;
      }
      return this.hitBTCApiService.getSymbolDescription(symbol.id);
    }).filter(request => request);
    zip(...arrayOfRequests).subscribe((symbolInfo: string[]) => {
      const objForUpd = {};
      symbolInfo.forEach((symbol: string) => {
        const parsedSymbolInfo: Symbol = JSON.parse(symbol);
        objForUpd[parsedSymbolInfo.id] = parsedSymbolInfo;
      });
      this.injectableObservables.config$.next({
        ...configUpdate,
        symbolInfo: objForUpd,
      });
    });
  }

  private handleBalanceUpdate(balance: CurrencyBalance[]): void {
    this.balance = balance;
  }
}
