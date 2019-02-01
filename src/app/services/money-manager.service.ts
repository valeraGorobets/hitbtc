import { Injectable } from '@angular/core';
import { InjectableObservables } from '../app-module/injectable-observables';
import { Side } from '../models/SharedConstants';

interface IActionUpdate {
  advisedResult: Side;
  timestamp: string;
}
@Injectable({
  providedIn: 'root',
})

export class MoneyManagerService {

  constructor(
    private injectableObservables: InjectableObservables,
  ) {
    console.log('MoneyManagerService');
    injectableObservables.strategyAction$.subscribe((actionUpdate: IActionUpdate) => this.handleActionUpdate(actionUpdate));
  }

  private handleActionUpdate(actionUpdate: IActionUpdate): void {
    console.log(actionUpdate);
  }
}
