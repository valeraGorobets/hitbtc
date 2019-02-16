import { Injectable } from '@angular/core';
import { InjectableObservablesService } from './injectable-observables.service';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { Candle, NotificationCandle } from '../models/Candle';

export interface ISavedCandles {
  [symbol: string]: Candle[];
}

@Injectable({
  providedIn: 'root',
})

export class CandleService {
  private savedCandles: ISavedCandles = {};
  public count = {};

  constructor(
    private injectableObservables: InjectableObservablesService,
    private cryptoExchangeService: HitBTCApi,
  ) {}

  public connectToHitBtcApi(symbol: string): void {
    this.count[symbol] = 0;
    this.cryptoExchangeService.createConnection(symbol);
    this.cryptoExchangeService.subscribeCandles(symbol);
    this.cryptoExchangeService.onMessage(symbol)
      .subscribe((message: any) => {
        switch (message.method) {
          case 'snapshotCandles':
            this.savedCandles[message.params.symbol] = [...message.params.data];
            break;
          case 'updateCandles':
            this.updateSavedCandles(message);
            break;
          default:
            if (!message.result ) {
              console.error('Cant handle unknown method');
              console.error(message);
            }
            break;
        }
      });
  }

  private updateSavedCandles(message: NotificationCandle): void {
    const symbol = message.params.symbol;
    const updateCandle = message.params.data.pop();
    // console.log(`${symbol} - ${updateCandle.close} - ${updateCandle.timestamp}`);
    const prevCandle = this.savedCandles[symbol][this.savedCandles[symbol].length - 1];
    const prevUpdate: number = +new Date(prevCandle.timestamp);
    const lastUpdate: number = +new Date(updateCandle.timestamp);
    if (lastUpdate - prevUpdate === 0) {
      this.savedCandles[symbol].pop();
    }
    this.savedCandles[symbol] = [...this.savedCandles[symbol], updateCandle];
    this.injectableObservables.candles$.next(this.savedCandles);
  }
}
