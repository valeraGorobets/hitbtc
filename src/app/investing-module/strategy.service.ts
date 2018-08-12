import { Injectable } from '@angular/core';
import { HitbtcApi } from '../crypto-exchange-module/hitbtc-api';

@Injectable({
  providedIn: 'root',
})
export class StrategyService {  
  public hitbtcApiService: HitbtcApi;

  constructor() {
    this.hitbtcApiService = new HitbtcApi();
    this.hitbtcApiService.createConnection();
    this.hitbtcApiService.subscribeCandles();
    this.hitbtcApiService.onMessage()
      .subscribe((message: any) => {
        console.log(message);
      });
    this.hitbtcApiService.closeConnection(5000);
  }
}
