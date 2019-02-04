import { Component } from '@angular/core';
import { InvestingService } from '../investing-module/investing.service';
import { CandleService } from '../services/candle.service';
import { InjectableObservables } from './injectable-observables';
import { MoneyManagerService } from '../services/money-manager.service';
import { AvailableStrategies } from '../investing-module/strategies/abstractStrategy';

const defaultConfig = {
  availableSymbolsForInvesting: [
   {
    id: 'ETHUSD',
    strategy: AvailableStrategies.ThreeMAStrategy,
  },
  {
    id: 'BTCUSD',
    strategy: AvailableStrategies.ThreeMAStrategy,
  },
  {
    id: 'LTCUSD',
    strategy: AvailableStrategies.ThreeMAStrategy,
  },
  {
    id: 'ZECUSD',
    strategy: AvailableStrategies.ThreeMAStrategy,
  },
  // {
  //   id: 'ETHBTC',
  //   strategy: AvailableStrategies.ThreeMAStrategy,
  // },
  // {
  //   id: 'XMRUSD',
  //   strategy: AvailableStrategies.ThreeMAStrategy,
  // }
  ],
  currentInvestingSymbol: 'BTCUSD',
  symbolInfo: {},
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public config: any = {...defaultConfig};

  constructor(
    private investingService: InvestingService,
    private moneyManagerService: MoneyManagerService,
    private candleService: CandleService,
    private injectableObservables: InjectableObservables,
    ) {
    this.injectableObservables.config$.next(this.config);
    this.config.availableSymbolsForInvesting.forEach(symbol => {
      this.candleService.connectToHitBtcApi(symbol.id);
    });
    this.injectableObservables.config$.subscribe((configUpdate: any) => this.config = {...this.config, ...configUpdate});
  }

  public stopWatching(): void {
    this.investingService.stopWatching();
  }

  public getBalance(): void {
    this.investingService.getBalance();
  }

  public getHistoryOrder(): void {
    this.investingService.getHistoryOrder();
  }
}
