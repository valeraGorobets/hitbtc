import { Injectable } from '@angular/core';
import { InjectableObservables } from '../app-module/injectable-observables';
import { Side } from '../models/SharedConstants';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { Symbol } from '../models/Symbol';
import { zip } from 'rxjs';

interface IActionUpdate {
  symbolID: string;
  advisedResult: Side;
  timestamp: string;
}
@Injectable({
  providedIn: 'root',
})

export class MoneyManagerService {
  private config: any;

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
    this.config = configUpdate;
    const arrayOfRequests = configUpdate.availableSymbolsForInvesting.map(symbol => {
      if (configUpdate[symbol.id]) {
        return;
      }
      return this.hitBTCApiService.getSymbolDescription(symbol.id);
    }).filter(request => request);
    zip(...arrayOfRequests).subscribe((symbolInfo: string[]) => {
      const objForUpd = {};
      symbolInfo.forEach((symbol: string) => {
        const parsedSymbolInfo: Symbol = JSON.parse(symbol);
        objForUpd[parsedSymbolInfo.id] = parsedSymbolInfo;
      });
      this.injectableObservables.config$.next({
        ...configUpdate,
        ...objForUpd,
      });
    });
  }
}
