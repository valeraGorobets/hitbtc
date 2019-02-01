import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

const defaultConfig = {
  investingSymbol: 'BTCUSD',
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
