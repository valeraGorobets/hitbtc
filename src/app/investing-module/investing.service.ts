import { Candle, NotificationCandle } from '../models/Candle';
import { CandlesChartFormat } from '../models/ChartFormats/CandlesChartFormat';
import { concatMap, delay } from 'rxjs/operators';
import { HitbtcApi } from '../crypto-exchange-module/hitbtc-api';
import { Injectable } from '@angular/core';
import { InjectableObservables } from '../app-module/injectable-observables';
import { MACDStrategy } from './strategies/MACD.strategy';
import { MALongMAShortStrategy } from './strategies/MALongMAShort.strategy';
import { Observable, Subject, from, of, pipe } from 'rxjs';
import { Side } from '../models/SharedConstants';
import { Strategy } from './strategies/abstractStrategy';

@Injectable({
  providedIn: 'root',
})

export class InvestingService{
  private strategyId = 'MACDStrategy';
  private strategy: Strategy;
  private openedTrade = null;
  private money: number = 1000;

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
    this.strategy = new strategyConstructor(injectableObservables, hitbtcApiService);
    this.injectableObservables.positionAction$.subscribe((action: any) => this.handleActionUpdate(action))
  }

  private handleActionUpdate(action: {candle: NotificationCandle, side: Side}) {
    if (action.side === Side.buy && !this.openedTrade) {
      this.openPosition(action.candle);
    } else if (action.side === Side.sell && this.openedTrade) {
      this.closePosition(action.candle);
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

  public stopWatching(): void {
    this.hitbtcApiService.closeConnection();
  }
}
