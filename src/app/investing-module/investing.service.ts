import { Candle, NotificationCandle } from '../models/Candle';
import { CandlesChartFormat } from '../models/ChartFormats/CandlesChartFormat';
import { concatMap, delay } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { HitbtcApi } from '../crypto-exchange-module/hitbtc-api';
import { Injectable } from '@angular/core';
import { InjectableObservables } from '../app-module/injectable-observables';
import { MACDFromPrimarySymbolStrategy } from './strategies/MACDFromPrimarySymbol.strategy';
import { MACDStrategy } from './strategies/MACD.strategy';
import { MALongMAShortStrategy } from './strategies/MALongMAShort.strategy';
import { Observable, Subject, from, of, pipe } from 'rxjs';
import { Orderbook } from '../models/Orderbook';
import { Side } from '../models/SharedConstants';
import { Strategy } from './strategies/abstractStrategy';

@Injectable({
  providedIn: 'root',
})

export class InvestingService {
  private actualOpenTime = null;
  private strategy: Strategy;
  private strategyId = 'MACDFromPrimarySymbolStrategy';
  private openedTrade = null;
  private money: number = 1000;
  private config = {
    allowedLost: 0.001,
    enoughtProfit: 0.01,
    indicatorSymbol: 'BTCUSD',
    investingSymbol: 'ETHBTC',
    quantityIncrement: 0.001,
    shiftForOpening: 3,
    tickSize: 0.000001,
  }

  constructor(
      private injectableObservables: InjectableObservables,
      private hitbtcApiService: HitbtcApi,
    ) {
    console.log('InvestingService working');
    let StrategyConstructor;
    switch (this.strategyId) {
      case 'MACDStrategy':
        StrategyConstructor = MACDStrategy;
        break;
      case 'MACDFromPrimarySymbolStrategy':
        StrategyConstructor = MACDFromPrimarySymbolStrategy;
        break;
      case 'MALongMAShortStrategy':
        StrategyConstructor = MALongMAShortStrategy;
        break;
    }
    this.strategy = new StrategyConstructor(injectableObservables, hitbtcApiService, this.config);
    this.injectableObservables.positionAction$.subscribe((action: any) => this.handleActionUpdate(action));
  }

  private handleActionUpdate(action: {time: string, side: Side}): void {
    // console.log(action);
    this.hitbtcApiService.getOrderbook(this.config.investingSymbol).pipe(
      first(),
    ).subscribe((orderbook: Orderbook) => {
      // console.log(orderbook.bid[0].price + ' bid | ask ' + orderbook.ask[0].price);
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
    const openPrice = bidPrice - 2 * this.config.tickSize;
    this.openedTrade = {
      time,
      openPrice,
      value: this.money / openPrice,
    }
    console.log(this.openedTrade);
    this.actualOpenTime = null;
  }

  private closePosition(time: string, askPrice: number): void {
    console.log('Close: ' + time);
    const closePrice = askPrice + 2 * this.config.tickSize;
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
      (openPrice - askPrice)/openPrice > this.config.allowedLost ||
      (askPrice - openPrice)/openPrice > this.config.enoughtProfit
    ) {
      console.log('Closing due to > allowedLost of enoghtProfit');
      return true;
    }
    return true;
  }

  public stopWatching(): void {
    this.hitbtcApiService.closeConnection();
  }
}
