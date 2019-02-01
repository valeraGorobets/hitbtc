import { Injectable } from '@angular/core';
import { InjectableObservables } from '../app-module/injectable-observables';
import { Side } from '../models/SharedConstants';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { Symbol } from '../models/Symbol';

interface IActionUpdate {
  advisedResult: Side;
  timestamp: string;
}
@Injectable({
  providedIn: 'root',
})

export class MoneyManagerService {
  private symbolInfo: Symbol;

  constructor(
    private injectableObservables: InjectableObservables,
    private hitBTCApiService: HitBTCApi,
  ) {
    injectableObservables.strategyAction$.subscribe((actionUpdate: IActionUpdate) => this.handleActionUpdate(actionUpdate));
    injectableObservables.config$.subscribe((config: any) => this.handleConfigUpdate(config));
  }

  private handleActionUpdate(actionUpdate: IActionUpdate): void {
    console.log(actionUpdate);
  }

  private handleConfigUpdate(configUpdate: any): void {
    this.hitBTCApiService.getSymbolDescription(configUpdate.investingSymbol)
      .subscribe((symbol: string) => {
        this.symbolInfo = JSON.parse(symbol);
        console.log(this.symbolInfo);
      });
  }
}
