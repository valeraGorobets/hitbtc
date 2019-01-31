import { first } from 'rxjs/operators';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { Injectable } from '@angular/core';
import { InjectableObservables } from '../app-module/injectable-observables';
import { Orderbook } from '../models/Orderbook';
import { Side } from '../models/SharedConstants';
import { Strategy } from './strategies/abstractStrategy';

// import { MACDFromPrimarySymbolStrategy } from './strategies/MACDFromPrimarySymbol.strategy';
// import { MACDStrategy } from './strategies/MACD.strategy';
// import { MALongMAShortStrategy } from './strategies/MALongMAShort.strategy';
import { ThreeMAStrategy } from './strategies/ThreeMA.strategy';

@Injectable({
  providedIn: 'root',
})

export class InvestingService {
  private actualOpenTime = null;
  private strategy: Strategy;
  private strategyId = 'ThreeMAStrategy';
  private openedTrade = null;
  private money: number = 1000;
  private config: any = {};

  constructor(
      private injectableObservables: InjectableObservables,
      private hitBTCApiService: HitBTCApi,
    ) {
    console.log('InvestingService working');

    this.strategy = this.getStrategyInstance();
    this.injectableObservables.config$.subscribe((action: any) => this.config = action);
    this.injectableObservables.positionAction$.subscribe((action: any) => this.handleActionUpdate(action));
  }

  private getStrategyInstance(): Strategy {
    let StrategyConstructor;
    switch (this.strategyId) {
      case 'ThreeMAStrategy':
        StrategyConstructor = ThreeMAStrategy;
        break;
      // case 'MACDStrategy':
      //   StrategyConstructor = MACDStrategy;
      //   break;
      // case 'MACDFromPrimarySymbolStrategy':
      //   StrategyConstructor = MACDFromPrimarySymbolStrategy;
      //   break;
      // case 'MALongMAShortStrategy':
      //   StrategyConstructor = MALongMAShortStrategy;
      //   break;
    }
    return new StrategyConstructor(this.injectableObservables, this.hitBTCApiService, this.config);
  }

  private handleActionUpdate(action: {time: string, side: Side}): void {
    // console.log(action);
    this.hitBTCApiService.getOrderbook(this.config.investingSymbol).pipe(
      first(),
    ).subscribe((orderbook: Orderbook) => {
      console.log(orderbook);
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
    const openPrice = bidPrice - this.config.tickSize *  2;
    this.openedTrade = {
      time,
      openPrice,
      value: this.money / openPrice,
    };
    console.log(this.openedTrade);
    this.actualOpenTime = null;
  }

  private closePosition(time: string, askPrice: number): void {
    console.log('Close: ' + time);
    const closePrice = askPrice + this.config.tickSize * 2;
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
      (openPrice - askPrice) / openPrice > this.config.allowedLost ||
      (askPrice - openPrice) / openPrice > this.config.enoughProfit
    ) {
      console.log('Closing due to > allowedLost of enoughProfit');
      return true;
    }
    return true;
  }

  public stopWatching(): void {
    this.hitBTCApiService.closeConnection();
  }
}
