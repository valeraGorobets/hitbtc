import { Injectable } from '@angular/core';
import { HitbtcApi } from '../crypto-exchange-module/hitbtc-api';
import { MA9MA5Strategy as Strategy } from './strategies/MA9MA5.strategy';
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
    this.strategy = new Strategy(injectableObservables);
    this.injectableObservables = injectableObservables;
    console.log(injectableObservables);

    this.connectToLocalData();
    // this.connectToHitBtcApi();
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
            break;
        }
      });
    this.hitbtcApiService.closeConnection(5000);
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
    const candles: Candle[] = message.params.data;
    this.injectableObservables.prices$.next(candles);
    this.savedCandles = [...this.savedCandles, ...candles];
  }

  private handleUpdateCandles(message: NotificationCandle): void {
    this.updateSavedCandles(message);
    const shouldInvest = this.strategy.shouldInvest(this.savedCandles);
    console.log(shouldInvest);
  }
}
