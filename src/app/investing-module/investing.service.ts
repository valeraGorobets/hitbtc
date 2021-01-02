import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { first } from 'rxjs/operators';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { IOrderbook, IOrderbookTick } from '../models/IOrderbook';
import { Side } from '../models/SharedConstants';
import { IndicatorService } from '../services/indicator.service';
import { InjectableObservablesService } from '../services/injectable-observables.service';
import { IMoneyUpdate } from '../services/money-manager.service';
import { PositionService } from '../services/position.service';
import { ThreeMAStrategy } from './strategies/ThreeMA.strategy';
import { AvailableStrategies, Strategy } from './strategies/abstractStrategy';

@Injectable({
	providedIn: 'root',
})

export class InvestingService {
	private strategy: Strategy;
	private config: any = {};
	private isFirstInit: boolean = true;

	constructor(
		private injectableObservables: InjectableObservablesService,
		private indicatorService: IndicatorService,
		private hitBTCApiService: HitBTCApi,
		private positionService: PositionService,
	) {
		console.log('InvestingService working');

		this.injectableObservables.config$
			.subscribe((config: any) => this.handleConfigUpdate(config));
		this.injectableObservables.moneyAction$
			.pipe(distinctUntilChanged(),
			).subscribe((moneyUpdate: any) => this.handleMoneyUpdate(moneyUpdate));
	}

	private handleConfigUpdate(config: any): void {
		console.log(config);
		this.config = config;
		if (this.isFirstInit) {
			config.availableSymbolsForInvesting.forEach((symbol: any) => this.createStrategyInstance(symbol));
			this.isFirstInit = false;
		}
	}

	private createStrategyInstance(symbol: any): Strategy {
		let StrategyConstructor: any;
		switch (symbol.strategy as AvailableStrategies) {
			case AvailableStrategies.ThreeMAStrategy:
				StrategyConstructor = ThreeMAStrategy;
				break;
			default:
				break;
		}
		return new StrategyConstructor(symbol.id, this.injectableObservables, this.indicatorService);
	}

	private handleMoneyUpdate(moneyUpdate: IMoneyUpdate): void {
		if (!moneyUpdate.amount) {
			return;
		} else {
			console.log(moneyUpdate);
			if (
				moneyUpdate.advisedResult === Side.buy && this.positionService.isPossibleToOpenPosition(moneyUpdate) ||
				moneyUpdate.advisedResult === Side.sell && this.positionService.isPossibleToClosePosition(moneyUpdate)
			) {
				this.hitBTCApiService.getOrderbook(moneyUpdate.symbolID).pipe(
					first(),
				).subscribe((orderbook: IOrderbook) => {
					if (moneyUpdate.advisedResult === Side.buy) {
						this.openPosition(moneyUpdate, orderbook.ask[0]);
					} else if (moneyUpdate.advisedResult === Side.sell) {
						this.openPosition(moneyUpdate, orderbook.bid[0]);
					}
				});
			}
		}
	}

	private openPosition(moneyUpdate: IMoneyUpdate, price: IOrderbookTick): void {
		console.log('Opening!!!!');
		const riskLevel: number = 0.002;
		const actualPrice: number = this.getActualPriceInString(moneyUpdate, price);
		const stopLossPrice: number = actualPrice - actualPrice * riskLevel;
		// const quantity = +moneyUpdate.amount / +actualPrice;
		this.hitBTCApiService.placeNewOrder({
			symbol: moneyUpdate.symbolID,
			side: moneyUpdate.advisedResult === Side.buy ? 'buy' : 'sell',
			type: 'limit',
			timeInForce: 'GTC',
			quantity: this.config.symbolInfo[moneyUpdate.symbolID].quantityIncrement,
			price: '1',
			stopPrice: stopLossPrice.toString(),
		}, true).subscribe();
	}

	private getActualPriceInString(moneyUpdate: IMoneyUpdate, price: IOrderbookTick): number {
		const riskLevel: number = 5;
		const isBuying: boolean = moneyUpdate.advisedResult === Side.buy;
		const quantityIncrement: number = +this.config.symbolInfo[moneyUpdate.symbolID].quantityIncrement * riskLevel;
		return isBuying ? +price.price - quantityIncrement : +price.price + quantityIncrement;
	}
}
