import { Component } from '@angular/core';
import { InvestingService } from '../investing-module/investing.service';
import { CandleService } from '../services/candle.service';
import { InjectableObservablesService } from '../services/injectable-observables.service';
import { MoneyManagerService } from '../services/money-manager.service';
import { AvailableStrategies } from '../investing-module/strategies/abstractStrategy';
import { BalanceService } from '../services/balance.service';
import {HitBTCApi} from '../crypto-exchange-module/hitbtc-api.service';
import {Order} from '../models/Order';

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
    private balanceService: BalanceService,
    private injectableObservables: InjectableObservablesService,
    private hitBTCApiService: HitBTCApi,
    ) {
    this.injectableObservables.config$.next(this.config);
    this.config.availableSymbolsForInvesting.forEach(symbol => {
      this.candleService.connectToHitBtcApi(symbol.id);
    });
    this.injectableObservables.config$.subscribe((configUpdate: any) => this.config = {...this.config, ...configUpdate});
  }

  // public stopWatching(): void {
  //   this.investingService.stopWatching();
  // }
  //
  // public getBalance(): void {
  //   this.investingService.getBalance();
  // }
  //
  // public getBalance2(): void {
  //   this.investingService.getBalance2();
  // }
  //
  // public getHistoryOrder(): void {
  //   this.investingService.getHistoryOrder();
  // }
  public placeOrder(): void {
    // const { symbol, side, type, timeInForce, quantity, price } = request.body;
    console.log('placing order');
    this.hitBTCApiService.placeNewOrder({
      symbol: 'ETHUSD',
      side: 'buy',
      type: 'limit',
      timeInForce: 'GTC',
      quantity: '0.0001',
      price: '1',
    }).subscribe((res: Order) => {
      console.log(res);
    });
  }
}
