import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { ISymbolForInvesting } from '../app-module/app.component';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { CurrencyBalance } from '../models/CurrencyBalance';
import { TNullable } from '../models/Nullable';
import { IOrderbook } from '../models/Orderbook';
import { Side } from '../models/SharedConstants';
import { IndicatorService } from '../services/indicator.service';
import { InjectableObservablesService } from '../services/injectable-observables.service';
import { IMoneyUpdate } from '../services/money-manager.service';
import { ThreeMAStrategy } from './strategies/ThreeMA.strategy';
import { AvailableStrategies, Strategy } from './strategies/abstractStrategy';

interface ITrade {
	time: string;
	openPrice: number;
	value: number;
}

@Injectable({
	providedIn: 'root',
})
export class InvestingService {
	private actualOpenTime: TNullable<Date> = null;
	private strategy: Strategy;
	private openedTrade: TNullable<ITrade> = null;
	private money: number = 1000;
	private config: any = {};
	private savedAdvice: {
		[symbol: string]: IMoneyUpdate,
	} = {};

	constructor(
		private injectableObservables: InjectableObservablesService,
		private indicatorService: IndicatorService,
		private hitBTCApiService: HitBTCApi,
	) {
		console.log('InvestingService working');

		this.injectableObservables.config$
			.pipe(first())
			.subscribe((config: any) => this.handleConfigUpdate(config));
		// this.injectableObservables.positionAction$.subscribe((actionUpdate: any) => this.handleActionUpdate(actionUpdate));
		// this.injectableObservables.moneyAction$.subscribe((moneyUpdate: any) => this.handleMoneyUpdate(moneyUpdate));
	}

	public getBalance(): void {
		this.hitBTCApiService.getBalance()
			.subscribe((res: CurrencyBalance[]) => {
				console.log(res);
			});
	}

	private handleConfigUpdate(config: any): void {
		this.config = config;
		config.availableSymbolsForInvesting.forEach((symbol: ISymbolForInvesting) => {
			this.createStrategyInstance(symbol);
		});
	}

	private handleMoneyUpdate(moneyUpdate: IMoneyUpdate): void {
		if (!moneyUpdate.amount) {
			return;
		} else if (!this.savedAdvice[moneyUpdate.symbolID] ||
			this.savedAdvice[moneyUpdate.symbolID].advisedResult !== moneyUpdate.advisedResult ||
			+new Date(moneyUpdate.timestamp) !== +new Date(this.savedAdvice[moneyUpdate.symbolID].timestamp)) {
			this.savedAdvice[moneyUpdate.symbolID] = moneyUpdate;
			console.log(this.savedAdvice);
		}
	}

	private createStrategyInstance(symbol: any): Strategy {
		let StrategyConstructor: any;
		switch (symbol.strategy as AvailableStrategies) {
			case 'ThreeMAStrategy':
				StrategyConstructor = ThreeMAStrategy;
				break;
			default:
				break;
		}
		return new StrategyConstructor(symbol.id, this.injectableObservables, this.indicatorService);
	}

	private handleActionUpdate(action: { time: string, side: Side }): void {
		// console.log(action);
		this.hitBTCApiService.getOrderbook(this.config.investingSymbol).pipe(
			first(),
		).subscribe((orderbook: IOrderbook) => {
			console.log(orderbook);
			if (action.side === Side.buy && !this.openedTrade && !this.actualOpenTime) {
				this.actualOpenTime = new Date(action.time);
				this.actualOpenTime.setMinutes(this.actualOpenTime.getMinutes() + this.config.shiftForOpening);
			} else if (+this.actualOpenTime === +new Date(action.time)) {
				this.openPosition(action.time, +orderbook.bid[0].price);
			} else if (action.side === Side.sell && this.openedTrade) {
				this.closePosition(action.time, +orderbook.ask[0].price);
			} else if (this.shouldBeClosedEarly(+orderbook.ask[0].price)) {
				this.closePosition(action.time, +orderbook.ask[0].price);
			}
		});
	}

	private openPosition(time: string, bidPrice: number): void {
		console.log(`Open: ${time}`);
		const openPrice: number = bidPrice - this.config.tickSize * 2;
		this.openedTrade = {
			time,
			openPrice,
			value: this.money / openPrice,
		};
		console.log(this.openedTrade);
		this.actualOpenTime = null;
	}

	private closePosition(time: string, askPrice: number): void {
		console.log(`Close: ${time}`);
		const closePrice: number = askPrice + this.config.tickSize * 2;
		this.money = this.openedTrade.value * closePrice;
		this.openedTrade = null;
		console.log(this.money);
	}

	// public stopWatching(): void {
	//   this.hitBTCApiService.closeConnection();
	// }

	private shouldBeClosedEarly(askPrice: number): boolean {
		if (!this.openedTrade) {
			return false;
		}
		const openPrice: number = this.openedTrade.openPrice;
		if (
			(openPrice - askPrice) / openPrice > this.config.allowedLost ||
			(askPrice - openPrice) / openPrice > this.config.enoughProfit
		) {
			console.log('Closing due to > allowedLost of enoughProfit');
			return true;
		}
		return true;
	}

	// public getBalance2(): void {
	//   this.hitBTCApiService.getBalance2().subscribe(res => {
	//     console.log(res);
	//   });
	// }
	//
	// public getHistoryOrder(): void {
	//   this.hitBTCApiService.getHistoryOrder().subscribe(res => {
	//     console.log(res);
	//   });
	// }
}
