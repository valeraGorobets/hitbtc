import { Candle, NotificationCandle } from '../models/Candle';
import { CandlesChartFormat } from '../models/ChartFormats/CandlesChartFormat';
import { concatMap, delay } from 'rxjs/operators';
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

export class InvestingService{
  private strategy: Strategy;
  private strategyId = 'MACDFromPrimarySymbolStrategy';
  private openedTrade = {
  time: "2018-11-18T17:13:00.000Z",
  openPrice: 0.03148400000908,
  value: 31762.164909160205,
};
  private money: number = 1000;
  private config = {
    investingSymbol: 'ETHBTC',
    indicatorSymbol: 'BTCUSD',
    quantityIncrement: 0.001,
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

  private handleActionUpdate(action: {time: string, side: Side}) {
    console.log(action);
    if (action.side === Side.buy && !this.openedTrade) {
      this.openPosition(action.time);
    } else if (action.side === Side.sell && this.openedTrade) {
      this.closePosition(action.time);
    }
  }

  private openPosition(time: string): void {
    console.log('Open: ' + time);
    this.hitbtcApiService.getOrderbook(this.config.investingSymbol).subscribe((orderbook: Orderbook) => {
      console.log(orderbook.bid[0].price + ' bid | ask ' + orderbook.ask[0].price);
      const openPrice = +orderbook.ask[0].price + 2 * this.config.tickSize;
      this.openedTrade = {
        time,
        openPrice,
        value: this.money / openPrice,
      }
      console.log(this.openedTrade);
    });
  }

  private closePosition(time: string): void {
    console.log('Close: ' + time);
    this.hitbtcApiService.getOrderbook(this.config.investingSymbol).subscribe((orderbook: Orderbook) => {
      console.log(orderbook.bid[0].price + ' bid | ask ' + orderbook.ask[0].price);
      const closePrice = +orderbook.bid[0].price - 2 * this.config.tickSize;
      this.money = this.openedTrade.value * closePrice;
      this.openedTrade = null;
      console.log(this.money);
    });
  }

  public stopWatching(): void {
    this.hitbtcApiService.closeConnection();
  }
}
