import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

const defaultConfig = {
  allowedLost: 0.001,
  enoughProfit: 0.01,
  indicatorSymbol: 'BTCUSD',
  investingSymbol: 'BTCUSD',
  quantityIncrement: 0.001,
  shiftForOpening: 3,
  tickSize: 0.000001,
};

@Injectable()
export class InjectableObservables {
  public config$ = new ReplaySubject();
  public candles$ = new ReplaySubject();
  public indicator$ = new ReplaySubject();
  public positionAction$ = new ReplaySubject();
  public strategyAction$ = new ReplaySubject();

  constructor() {
    this.config$.next(defaultConfig);
  }
}
