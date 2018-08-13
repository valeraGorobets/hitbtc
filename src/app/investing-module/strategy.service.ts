import { Injectable } from '@angular/core';
import { HitbtcApi } from '../crypto-exchange-module/hitbtc-api';
import { MA9MA5Strategy as Strategy } from './strategies/MA9MA5.strategy';

@Injectable({
  providedIn: 'root',
})
export class StrategyService {
  public hitbtcApiService: HitbtcApi;
  private strategy: Strategy;

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
  }
}
