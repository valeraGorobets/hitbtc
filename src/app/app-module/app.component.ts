import { Component } from '@angular/core';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { InvestingService } from '../investing-module/investing.service';
import { AvailableStrategies } from '../investing-module/strategies/abstractStrategy';
import { Order } from '../models/Order';
import { BalanceService } from '../services/balance.service';
import { CandleService } from '../services/candle.service';
import { InjectableObservablesService } from '../services/injectable-observables.service';
import { MoneyManagerService } from '../services/money-manager.service';
import { ReportService } from '../services/report.service';

const defaultConfig: any = {
	availableSymbolsForInvesting: [
		// {
		//     id: 'DASHUSD',
		//     strategy: AvailableStrategies.ThreeMAStrategy,
		// },
		{
			id: 'ETHUSD',
			strategy: AvailableStrategies.ThreeMAStrategy,
		},
		// {
		//   id: 'BTCUSD',
		//   strategy: AvailableStrategies.ThreeMAStrategy,
		// },
		// {
		//   id: 'LTCUSD',
		//   strategy: AvailableStrategies.ThreeMAStrategy,
		// },
		// {
		//   id: 'ETHBTC',
		//   strategy: AvailableStrategies.ThreeMAStrategy,
		// },
		// {
		//   id: 'XMRUSD',
		//   strategy: AvailableStrategies.ThreeMAStrategy,
		// },
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
	public config: any = { ...defaultConfig };

	constructor(
		private hitBTCApiService: HitBTCApi,
		private investingService: InvestingService,
		private moneyManagerService: MoneyManagerService,
		private candleService: CandleService,
		private balanceService: BalanceService,
		private reportService: ReportService,
		private injectableObservables: InjectableObservablesService,
	) {
		this.injectableObservables.config$.next(this.config);
		this.config.availableSymbolsForInvesting.forEach((symbol: any) => {
			this.candleService.connectToHitBtcApi(symbol.id);
		});
		this.injectableObservables.config$.subscribe((configUpdate: any) => this.config = { ...this.config, ...configUpdate });
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
			symbol: 'DASHUSD',
			side: 'sell',
			type: 'limit',
			timeInForce: 'GTC',
			quantity: '0.001',
			price: '120',
		}).subscribe((order: Order) => {
			console.log(order);
		});
	}

	public getww(): void {
		this.hitBTCApiService.getOrders();
		this.hitBTCApiService.onMessage('getOrders').subscribe((msg2: any) => console.log(msg2));
	}

	public subscribeReports(): void {
		this.hitBTCApiService.subscribeReports();
		this.hitBTCApiService.onMessage('subscribeReports').subscribe((msg2: any) => console.log(msg2));
	}
}
