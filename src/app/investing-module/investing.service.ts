import { Injectable } from '@angular/core';
import { HitbtcApi } from '../crypto-exchange-module/hitbtc-api';
import { Strategy } from './strategies/abstractStrategy';
import { MALongMAShortStrategy } from './strategies/MALongMAShort.strategy';
import { MACDStrategy } from './strategies/MACD.strategy';
import { NotificationCandle } from '../models/NotificationCandle';
import { CandlesChartFormat } from '../models/ChartFormats/CandlesChartFormat';
import { Candle } from '../models/Candle';
import { Side } from '../models/SharedConstants';

import { InjectableObservables } from '../app-module/injectable-observables';

import { Observable, Subject, from, of, pipe } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

import * as notificationCandle from './../app-module/traiding-view/data.json';

@Injectable({
  providedIn: 'root',
})
export class InvestingService{
  private strategyId = 'MACDStrategy';
  private strategy: Strategy;
  private savedCandles: Candle[] = [];
  private notificationCandle: NotificationCandle = (notificationCandle as any) as NotificationCandle;

  private openedTrade = null;
  private money: number = 1000;
  private value: number = 0;

  constructor(
    private injectableObservables: InjectableObservables,
    private hitbtcApiService: HitbtcApi,
    ) {
    console.log('InvestingService working');
    let strategyConstructor;
    switch (this.strategyId) {
      case 'MACDStrategy':
        strategyConstructor = MACDStrategy;
        break;
      case 'MALongMAShortStrategy':
        strategyConstructor = MALongMAShortStrategy;
        break;
    }
    this.strategy = new strategyConstructor(injectableObservables.indicator$);
    this.injectableObservables = injectableObservables;
    this.hitbtcApiService = hitbtcApiService;

    // this.connectToLocalData();
    this.connectToHitBtcApi();
  }

  private connectToLocalData(): void {
    const data = this.notificationCandle.params.data;
    const history = data.slice(0, 25);
    this.updateSavedCandles(this.candleToNotificationCandle('snapshotCandles', history));

    const restData = data.slice(25);
    for (let i = 0; i < restData.length; i++) {
      setTimeout(() => {
        this.handleUpdateCandles(this.candleToNotificationCandle('updateCandles', [restData[i]]));
      }, i * 0);
    }
    setTimeout(() => {
      console.log(this.openedTrade);
    });
  }

  private connectToHitBtcApi(): void {
    this.hitbtcApiService.createConnection();
    this.hitbtcApiService.subscribeCandles();
    this.hitbtcApiService.onMessage()
      .subscribe((message: any) => {
        switch (message.method) {
          case 'snapshotCandles':
            this.updateSavedCandles(message);
          break;
          case 'updateCandles':
            this.handleUpdateCandles(message);
          break;
          default:
            console.error('Cant handle unknown method');
            console.error(message);
            break;
        }
      });
  }

  private handleUpdateCandles(candle: NotificationCandle): void {
    this.updateSavedCandles(candle);
    const advisedInvestingSide: Side = this.strategy.advisedInvestingSide(this.savedCandles);
    if (advisedInvestingSide === Side.buy && !this.openedTrade) {
      this.openPosition(candle);
    } else if (advisedInvestingSide === Side.sell && this.openedTrade) {
      this.closePosition(candle);
    }
  }

  private openPosition(candle: NotificationCandle): void {
    const candleData = candle.params.data[0];
    this.openedTrade = {
      time: candleData.timestamp,
      value: this.money / +candleData.close,

    }
    console.log(this.openedTrade);
  }

  private closePosition(candle: NotificationCandle): void {
    const candleData = candle.params.data[0];
    this.money = this.openedTrade.value * +candleData.close;
    this.openedTrade = null;
    console.log(this.money);
  }

  private updateSavedCandles(message: NotificationCandle): void {
    let candles: Candle[] = message.params.data;
    this.injectableObservables.candles$.next(candles);
    if (message.method === 'updateCandles') {
      this.updatePrevCandle(candles[0]);
      candles = candles.slice(0, 1);
    }
    this.savedCandles = [...this.savedCandles, ...candles];
  }

  private updatePrevCandle(updateCandle: Candle): void {
    const prevCandle = this.savedCandles[this.savedCandles.length - 1];
    const prevUpdate: number = +new Date(prevCandle.timestamp);
    const lastUpdate: number = +new Date(updateCandle.timestamp);
    if (lastUpdate - prevUpdate === 0) {
      this.savedCandles.pop();
    }
  }

  private candleToNotificationCandle(method: string, el: Candle[]): NotificationCandle {
    return {
      jsonrpc: '2.0',
      method,
      params: {
        data: el,
        symbol: 'ETHBTC',
        period: 'M1',
      },
    };
  }

  public stopWatching(): void {
    this.hitbtcApiService.closeConnection();
  }
}
