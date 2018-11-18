import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class InjectableObservables {
  public candles$ = new ReplaySubject();
  public indicator$ = new ReplaySubject();
  public positionAction$ = new ReplaySubject();

  constructor() { }
}
