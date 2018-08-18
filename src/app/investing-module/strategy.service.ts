import { Injectable } from '@angular/core';
import { HitbtcApi } from '../crypto-exchange-module/hitbtc-api';
import Strategy from './strategies/MALongMAShort.strategy';
import { NotificationCandle } from '../trade-module/models/NotificationCandle';
import { CandlesChartFormat } from '../trade-module/models/ChartFormats/CandlesChartFormat';
import { Candle } from '../trade-module/models/Candle';

import { InjectableObservables } from '../app-module/injectable-observables';

import { Observable, Subject, from, of, pipe } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

import * as notificationCandle from './../app-module/traiding-view/data.json';

@Injectable({
  providedIn: 'root',
})
export class StrategyService{
  private hitbtcApiService: HitbtcApi;
  private strategy: Strategy;
  private savedCandles: Candle[] = [];
  private notificationCandle: NotificationCandle = (notificationCandle as any) as NotificationCandle;

  constructor(private injectableObservables: InjectableObservables) {
    console.log('working');
    this.strategy = new Strategy(injectableObservables, 5, 9);
    this.injectableObservables = injectableObservables;
    console.log(injectableObservables);

    // this.connectToLocalData();
    this.connectToHitBtcApi();
  }

  private connectToLocalData(): void {
    const data = this.notificationCandle.params.data;
    const history = data.slice(0, 10);
    this.updateSavedCandles(this.candleToNotificationCandle('snapshotCandles', history));

    const restData = data.slice(10);
    for (let i = 0; i < restData.length; i++) {
      setTimeout(() => {
        this.handleUpdateCandles(this.candleToNotificationCandle('updateCandles', [restData[i]]));
      }, i * 200);
    }
  }

  private connectToHitBtcApi(): void {
    this.hitbtcApiService = new HitbtcApi();
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

  public stopWatching(): void {
    this.hitbtcApiService.closeConnection();
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

  private updateSavedCandles(message: NotificationCandle): void {
    let candles: Candle[] = message.params.data;
    this.injectableObservables.candles$.next(candles);
    if (message.method === 'updateCandles') {
      this.updatePrevCandle(candles[0]);
      candles = candles.slice(0, 1);
    }
    this.savedCandles = [...this.savedCandles, ...candles];
  }

  private handleUpdateCandles(message: NotificationCandle): void {
    this.updateSavedCandles(message);
    const shouldInvest = this.strategy.shouldInvest(this.savedCandles);
    console.log(shouldInvest);
  }

  private updatePrevCandle(updateCandle: Candle): void {
    const prevCandle = this.savedCandles[this.savedCandles.length - 1];
    const prevUpdate: number = +new Date(prevCandle.timestamp);
    const lastUpdate: number = +new Date(updateCandle.timestamp);
    if (lastUpdate - prevUpdate === 0) {
      this.savedCandles.pop();
    }
  }
}
