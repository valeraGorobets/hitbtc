import { Injectable } from '@angular/core';
import { InjectableObservables } from '../app-module/injectable-observables';
import { Side } from '../models/SharedConstants';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { Symbol } from '../models/Symbol';
import { zip } from 'rxjs';

interface IActionUpdate {
  symbolID: string;
  advisedResult: Side;
  timestamp: string;
}

export interface IMoneyUpdate extends IActionUpdate{
  amount: number;
}

export interface IBalance {
  currency: string;
  available: string;
  reserved: string;
}

@Injectable({
  providedIn: 'root',
})

export class MoneyManagerService {
  private config: any;
  private balance: IBalance[] = [];

  constructor(
    private injectableObservables: InjectableObservables,
    private hitBTCApiService: HitBTCApi,
  ) {
    injectableObservables.strategyAction$.subscribe((actionUpdate: IActionUpdate) => this.handleActionUpdate(actionUpdate));
    injectableObservables.config$.subscribe((configUpdate: any) => this.handleConfigUpdate(configUpdate));
    // setInterval(() => {
    //   const newobj = this.balance;
    //   let v = +newobj[4].available;
    //   v += 1;
    //   newobj[4].available = v.toString();
    //   this.injectableObservables.balance$.next(newobj);
    // }, 2000);
  }

  private handleActionUpdate(actionUpdate: IActionUpdate): void {
    if (actionUpdate.advisedResult !== Side.none) {
      this.injectableObservables.moneyAction$.next({
        ...actionUpdate,
        amount: this.countAmountAvailableToPerform(actionUpdate, this.balance),
      });
    }
  }

  private updateBalance(): void {
    this.hitBTCApiService.getBalance().subscribe((balanceValues: IBalance[]) => {
      console.log(balanceValues);
      this.balance = balanceValues;
      this.injectableObservables.balance$.next(balanceValues);
    });
  }

  private handleConfigUpdate(configUpdate: any): void {
    this.updateBalance();
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

  private countAmountAvailableToPerform(actionUpdate: IActionUpdate, balanceValues: IBalance[]): number {
    switch (actionUpdate.advisedResult) {
      case Side.buy:
        return +balanceValues.find(
          (balance: IBalance) => balance.currency === this.config.symbolInfo[actionUpdate.symbolID].quoteCurrency,
        ).available;
      case Side.sell:
        return +balanceValues.find(
          (balance: IBalance) => balance.currency === this.config.symbolInfo[actionUpdate.symbolID].baseCurrency,
        ).available;
      default:
        return 0;
    }
  }
}
