import { Injectable } from '@angular/core';
import { HitbtcApi } from '../crypto-exchange-module/hitbtc-api';
import { MA9MA5Strategy as Strategy } from './strategies/MA9MA5.strategy';
import * as notificationCandle from './../app-module/traiding-view/data.json';
import { NotificationCandle } from '../trade-module/models/NotificationCandle';

import { Observable, from, of, pipe } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StrategyService {
  public hitbtcApiService: HitbtcApi;
  private strategy: Strategy;
  public notificationCandle: NotificationCandle = (notificationCandle as any) as NotificationCandle;

  constructor() {
    console.log('working');
    this.strategy = new Strategy();

    // this.hitbtcApiService = new HitbtcApi();
    // this.hitbtcApiService.createConnection();
    // this.hitbtcApiService.subscribeCandles();
    // this.hitbtcApiService.onMessage()
    //   .subscribe((message: any) => {
    //     console.log(message);
    //   });
    // this.hitbtcApiService.closeConnection(5000);

    const ar = [1,2,3,4,5,6,7];

    // const source = from(notificationCandle.params.data).pipe(
    const source = from(ar).pipe(
      concatMap(val => of(val).pipe(delay(1000))),
    );

    setTimeout(() => ar.push(400), 2000)

    const subscription1 = source.subscribe(
      x => console.log('Observer 1: onNext: %s', x),
      e => console.log('Observer 1: onError: %s', e),
      () => console.log('Observer 1: onCompleted'));

  }
}
