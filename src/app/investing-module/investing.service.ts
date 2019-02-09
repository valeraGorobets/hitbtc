import { first } from 'rxjs/operators';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { Injectable } from '@angular/core';
import { InjectableObservables } from '../app-module/injectable-observables';
import { Orderbook } from '../models/Orderbook';
import { Side } from '../models/SharedConstants';
import { AvailableStrategies, Strategy } from './strategies/abstractStrategy';
import { ThreeMAStrategy } from './strategies/ThreeMA.strategy';
import { IndicatorService } from '../services/indicator.service';
import { IMoneyUpdate } from '../services/money-manager.service';

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

  constructor(
      private injectableObservables: InjectableObservables,
      private indicatorService: IndicatorService,
      private hitBTCApiService: HitBTCApi,
    ) {
    console.log('InvestingService working');

    this.injectableObservables.config$
      .pipe(first())
      .subscribe((config: any) => this.handleConfigUpdate(config));
    this.injectableObservables.positionAction$.subscribe((actionUpdate: any) => this.handleActionUpdate(actionUpdate));
    this.injectableObservables.moneyAction$.subscribe((moneyUpdate: any) => this.handleMoneyUpdate(moneyUpdate));
  }

  private handleConfigUpdate(config: any): void {
    this.config = config;
    config.availableSymbolsForInvesting.forEach(symbol => {
      this.createStrategyInstance(symbol);
    });
  }

  private handleMoneyUpdate(moneyUpdate: IMoneyUpdate): void {
    if (!moneyUpdate.amount) {
      return;
    } else if (!this.savedAdvice[moneyUpdate.symbolID] ||
      this.savedAdvice[moneyUpdate.symbolID].advisedResult !== moneyUpdate.advisedResult ||
      +new Date(moneyUpdate.timestamp) !== +new Date(this.savedAdvice[moneyUpdate.symbolID].timestamp)) {
        this.savedAdvice[moneyUpdate.symbolID] = moneyUpdate;
        console.log(this.savedAdvice);
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

  private handleActionUpdate(action: {time: string, side: Side}): void {
    // console.log(action);
    this.hitBTCApiService.getOrderbook(this.config.investingSymbol).pipe(
      first(),
    ).subscribe((orderbook: Orderbook) => {
      console.log(orderbook);
      if (action.side === Side.buy && !this.openedTrade && !this.actualOpenTime) {
        this.actualOpenTime = new Date(action.time);
        this.actualOpenTime.setMinutes(this.actualOpenTime.getMinutes() + this.config.shiftForOpening);
      } else if (+this.actualOpenTime === +new Date(action.time)) {
        this.openPosition(action.time, +orderbook.bid[0].price);
      } else if (action.side === Side.sell && this.openedTrade) {
        this.closePosition(action.time, +orderbook.ask[0].price);
      } else if (this.shouldBeClosedEarly(+orderbook.ask[0].price)) {
        this.closePosition(action.time, +orderbook.ask[0].price);
      }
    });
  }

  private openPosition(time: string, bidPrice: number): void {
    console.log('Open: ' + time);
    const openPrice = bidPrice - this.config.tickSize *  2;
    this.openedTrade = {
      time,
      openPrice,
      value: this.money / openPrice,
    };
    console.log(this.openedTrade);
    this.actualOpenTime = null;
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

  public stopWatching(): void {
    this.hitBTCApiService.closeConnection();
  }

  public getBalance(): void {
    this.hitBTCApiService.getBalance().subscribe(res => {
      console.log(res);
    });
  }

  public getHistoryOrder(): void {
    this.hitBTCApiService.getHistoryOrder().subscribe(res => {
      console.log(res);
    });
  }
}
