import { first } from 'rxjs/operators';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { Injectable } from '@angular/core';
import { InjectableObservablesService } from '../services/injectable-observables.service';
import { IOrderbook, IOrderbookTick } from '../models/IOrderbook';
import { Side } from '../models/SharedConstants';
import { AvailableStrategies, Strategy } from './strategies/abstractStrategy';
import { ThreeMAStrategy } from './strategies/ThreeMA.strategy';
import { IndicatorService } from '../services/indicator.service';
import { IMoneyUpdate } from '../services/money-manager.service';
import { INewOrder, Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})

export class InvestingService {
  private config: any = {};
  private savedAdvice: {
    [symbol: string]: IMoneyUpdate,
  } = {};
  private isFirstInit: boolean = true;

  constructor(
      private injectableObservables: InjectableObservablesService,
      private indicatorService: IndicatorService,
      private hitBTCApiService: HitBTCApi,
    ) {
    console.log('InvestingService working');

    this.injectableObservables.config$
      .subscribe((config: any) => this.handleConfigUpdate(config));
    this.injectableObservables.moneyAction$.subscribe((moneyUpdate: any) => this.handleMoneyUpdate(moneyUpdate));
  }

  private handleConfigUpdate(config: any): void {
    console.log(config);
    this.config = config;
    if (this.isFirstInit) {
      config.availableSymbolsForInvesting.forEach(symbol => {
        this.createStrategyInstance(symbol);
      });
      this.isFirstInit = false;
    }
  }

  private createStrategyInstance(symbol: any): Strategy {
    let StrategyConstructor;
    switch (symbol.strategy as AvailableStrategies) {
      case 'ThreeMAStrategy':
        StrategyConstructor = ThreeMAStrategy;
        break;
    }
    return new StrategyConstructor(symbol.id, this.injectableObservables, this.indicatorService);
  }

  private handleMoneyUpdate(moneyUpdate: IMoneyUpdate): void {
    // console.log(moneyUpdate);
    if (!moneyUpdate.amount) {
      return;
    } else if (
      !this.savedAdvice[moneyUpdate.symbolID] ||
      this.savedAdvice[moneyUpdate.symbolID].advisedResult !== moneyUpdate.advisedResult ||
      +new Date(moneyUpdate.timestamp) !== +new Date(this.savedAdvice[moneyUpdate.symbolID].timestamp)) {
        this.savedAdvice[moneyUpdate.symbolID] = moneyUpdate;
        console.log(this.savedAdvice);
      this.hitBTCApiService.getOrderbook(moneyUpdate.symbolID).pipe(
        first(),
      ).subscribe((orderbook: IOrderbook) => {
        if (moneyUpdate.advisedResult === Side.buy) {
          this.placeNewOrder(moneyUpdate, this.getActualPriceInString(moneyUpdate, orderbook));
        }
      });
    }
  }

  private getActualPriceInString(moneyUpdate: IMoneyUpdate, orderbook: IOrderbook): string {
    const isBuying = moneyUpdate.advisedResult === Side.buy;
    const riskLevel = 5;
    const quantityIncrement = +this.config.symbolInfo[moneyUpdate.symbolID].quantityIncrement * riskLevel;
    const actualPrice = isBuying ? +orderbook.ask[0].price - quantityIncrement : +orderbook.bid[0].price + quantityIncrement;
    return actualPrice.toString();
  }

  private placeNewOrder(moneyUpdate: IMoneyUpdate, price: string): void {
    console.log('Opening!!!!');
    // const quantity = +moneyUpdate.amount / +price;
    this.hitBTCApiService.placeNewOrder({
      symbol: moneyUpdate.symbolID,
      side: moneyUpdate.advisedResult === Side.buy ? 'buy' : 'sell',
      type: 'limit',
      timeInForce: 'GTC',
      quantity: moneyUpdate.amount.toString(),
      price,
    }, true).subscribe((res: Order) => {
      console.log(res);
    });
  }

  // public stopWatching(): void {
  //   this.hitBTCApiService.closeConnection();
  // }
  //
  // public getBalance(): void {
  //   this.hitBTCApiService.getBalance().subscribe(res => {
  //     console.log(res);
  //   });
  // }
  //
  // public getBalance2(): void {
  //   this.hitBTCApiService.getBalance2().subscribe(res => {
  //     console.log(res);
  //   });
  // }
  //
  // public getHistoryOrder(): void {
  //   this.hitBTCApiService.getHistoryOrder().subscribe(res => {
  //     console.log(res);
  //   });
  // }
}
