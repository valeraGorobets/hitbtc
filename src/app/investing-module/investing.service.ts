import { first } from 'rxjs/operators';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { Injectable } from '@angular/core';
import { InjectableObservablesService } from '../services/injectable-observables.service';
import { IOrderbook, IOrderbookTick } from '../models/IOrderbook';
import { Side } from '../models/SharedConstants';
import { AvailableStrategies, Strategy } from './strategies/abstractStrategy';
import { ThreeMAStrategy } from './strategies/ThreeMA.strategy';
import { IndicatorService } from '../services/indicator.service';
import { IMoneyUpdate } from '../services/money-manager.service';
import { Order } from '../models/Order';
import { PositionService } from '../services/position.service';

@Injectable({
  providedIn: 'root',
})

export class InvestingService {
  private strategy: Strategy;
  private config: any = {};
  private isFirstInit: boolean = true;

  constructor(
      private injectableObservables: InjectableObservablesService,
      private indicatorService: IndicatorService,
      private hitBTCApiService: HitBTCApi,
      private positionService: PositionService,
    ) {
    console.log('InvestingService working');

    this.injectableObservables.config$
      .subscribe((config: any) => this.handleConfigUpdate(config));
    this.injectableObservables.moneyAction$.subscribe((moneyUpdate: any) => this.handleMoneyUpdate(moneyUpdate));
  }

  private handleConfigUpdate(config: any): void {
    console.log(config);
    this.config = config;
    if (this.isFirstInit) {
      config.availableSymbolsForInvesting.forEach(symbol => {
        this.createStrategyInstance(symbol);
      });
      this.isFirstInit = false;
    }
  }

  private createStrategyInstance(symbol: any): Strategy {
    let StrategyConstructor;
    switch (symbol.strategy as AvailableStrategies) {
      case 'ThreeMAStrategy':
        StrategyConstructor = ThreeMAStrategy;
        break;
    }
    return new StrategyConstructor(symbol.id, this.injectableObservables, this.indicatorService);
  }

  private handleMoneyUpdate(moneyUpdate: IMoneyUpdate): void {
    if (!moneyUpdate.amount) {
      return;
    } else {
      if (
        moneyUpdate.advisedResult === Side.buy && this.positionService.isPossibleToOpenPosition(moneyUpdate) ||
        moneyUpdate.advisedResult === Side.sell && this.positionService.isPossibleToClosePosition(moneyUpdate)
      ) {
        this.hitBTCApiService.getOrderbook(moneyUpdate.symbolID).pipe(
          first(),
        ).subscribe((orderbook: IOrderbook) => {
          if (moneyUpdate.advisedResult === Side.buy) {
            this.openPosition(moneyUpdate, orderbook.ask[0]);
          } else if (moneyUpdate.advisedResult === Side.sell) {
            this.openPosition(moneyUpdate, orderbook.bid[0]);
          }
        });
      }
    }
  }

  private openPosition(moneyUpdate: IMoneyUpdate, price: IOrderbookTick): void {
    console.log('Opening!!!!');
    const riskLevel = 0.002;
    const actualPrice = this.getActualPriceInString(moneyUpdate, price);
    const stopLossPrice = actualPrice - actualPrice * riskLevel;
    // const quantity = +moneyUpdate.amount / +actualPrice;
    this.hitBTCApiService.placeNewOrder({
      symbol: moneyUpdate.symbolID,
      side: moneyUpdate.advisedResult === Side.buy ? 'buy' : 'sell',
      type: 'limit',
      timeInForce: 'GTC',
      quantity: this.config.symbolInfo[moneyUpdate.symbolID].quantityIncrement,
      price: '1',
      stopPrice: stopLossPrice.toString(),
    }, true).subscribe((order: Order) => {
      console.log(order);
      this.positionService.updatePositionList(moneyUpdate, order);
    });
  }

  private getActualPriceInString(moneyUpdate: IMoneyUpdate, price: IOrderbookTick): number {
    const riskLevel = 5;
    const isBuying = moneyUpdate.advisedResult === Side.buy;
    const quantityIncrement = +this.config.symbolInfo[moneyUpdate.symbolID].quantityIncrement * riskLevel;
    const actualPrice = isBuying ? +price.price - quantityIncrement : +price.price + quantityIncrement;
    return actualPrice;
  }
}
