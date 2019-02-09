import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class InjectableObservables {
  public config$ = new ReplaySubject();
  public candles$ = new ReplaySubject();
  public indicator$ = new ReplaySubject();
  public positions$ = new ReplaySubject();
  public positionAction$ = new ReplaySubject();
  public strategyAction$ = new ReplaySubject();
  public moneyAction$ = new ReplaySubject();

  constructor() {}
}
