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
  private actualOpenTime = null;
  private strategy: Strategy;
  private openedTrade = null;
  private money: number = 1000;
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
          this.openPosition(moneyUpdate, orderbook.ask[0]);
        }
      });
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

  // private handleActionUpdate(action: {time: string, side: Side}): void {
  //   // console.log(action);
  //   this.hitBTCApiService.getOrderbook(this.config.investingSymbol).pipe(
  //     first(),
  //   ).subscribe((orderbook: IOrderbook) => {
  //     console.log(orderbook);
  //     if (action.side === Side.buy && !this.openedTrade && !this.actualOpenTime) {
  //       this.actualOpenTime = new Date(action.time);
  //       this.actualOpenTime.setMinutes(this.actualOpenTime.getMinutes() + this.config.shiftForOpening);
  //     } else if (+this.actualOpenTime === +new Date(action.time)) {
  //       this.openPosition(action.time, +orderbook.bid[0].price);
  //     } else if (action.side === Side.sell && this.openedTrade) {
  //       this.closePosition(action.time, +orderbook.ask[0].price);
  //     } else if (this.shouldBeClosedEarly(+orderbook.ask[0].price)) {
  //       this.closePosition(action.time, +orderbook.ask[0].price);
  //     }
  //   });
  // }

  private openPosition(moneyUpdate: IMoneyUpdate, price: IOrderbookTick): void {
    console.log('Opening!!!!');
    const actualPrice = this.getActualPriceInString(moneyUpdate, price);
    // const quantity = +moneyUpdate.amount / +actualPrice;
    this.hitBTCApiService.placeNewOrder({
      symbol: moneyUpdate.symbolID,
      side: moneyUpdate.advisedResult === Side.buy ? 'buy' : 'sell',
      type: 'limit',
      timeInForce: 'GTC',
      quantity: this.config.symbolInfo[moneyUpdate.symbolID].quantityIncrement,
      price: actualPrice,
    }, true).subscribe((res: Order) => {
      console.log(res);
    });
  }

  private getActualPriceInString(moneyUpdate: IMoneyUpdate, price: IOrderbookTick): string {
    const riskLevel = 5;
    const isBuying = moneyUpdate.advisedResult === Side.buy;
    const quantityIncrement = +this.config.symbolInfo[moneyUpdate.symbolID].quantityIncrement * riskLevel;
    const actualPrice = isBuying ? +price.price - quantityIncrement : +price.price + quantityIncrement;
    return actualPrice.toString();
  }

  private closePosition(time: string, askPrice: number): void {
    console.log('Close: ' + time);
    const closePrice = askPrice + this.config.tickSize * 2;
    this.money = this.openedTrade.value * closePrice;
    this.openedTrade = null;
    console.log(this.money);
  }

  private shouldBeClosedEarly(askPrice: number): boolean {
    if (!this.openedTrade) {
      return false;
    }
    const openPrice = this.openedTrade.openPrice;
    if (
      (openPrice - askPrice) / openPrice > this.config.allowedLost ||
      (askPrice - openPrice) / openPrice > this.config.enoughProfit
    ) {
      console.log('Closing due to > allowedLost of enoughProfit');
      return true;
    }
    return true;
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
