import { Candle } from '../../models/Candle';
import { Side } from '../../models/SharedConstants';
import { ISavedCandles } from '../../services/candle.service';
import { IndicatorService, IndicatorUpdateModelValues } from '../../services/indicator.service';
import { InjectableObservablesService } from '../../services/injectable-observables.service';
import { MA } from '../indicators/ma';
import { Strategy } from './abstractStrategy';

export class ThreeMAStrategy implements Strategy {
	private field: string = 'close';
	private timestamp: string;

	private MAShort: MA = new MA(9);
	private MAMiddle: MA = new MA(13);
	private MALong: MA = new MA(21);

	constructor(
		private symbolID: string,
		private injectableObservables: InjectableObservablesService,
		private indicatorService: IndicatorService,
	) {
		console.log('Strategy ThreeMAStrategy started');
		injectableObservables.candles$.subscribe((candlesUpdate: ISavedCandles) => this.handleCandlesUpdate(candlesUpdate));
	}

	private handleCandlesUpdate(candlesUpdate: ISavedCandles): void {
		// console.log(`${this.symbolID} - ${this.timestamp}`);
		// console.log(candlesUpdate);
		const candles: Candle[] = candlesUpdate[this.symbolID] || [];
		if (!candles.length) {
			return;
		}
		this.timestamp = candles[candles.length - 1].timestamp;
		const advisedResult: Side = this.advisedInvestingSide(candles);
		this.injectableObservables.strategyAction$.next({
			symbolID: this.symbolID,
			advisedResult,
			timestamp: this.timestamp,
		});
	}

	public advisedInvestingSide(candles: Candle[], isPartOfStrategy?: boolean): Side {
		const prices: number[] = candles.map((candle: Candle) => +candle[this.field]);

		const shortValue: number = this.MAShort.calculate(prices);
		const middleValue: number = this.MAMiddle.calculate(prices);
		const longValue: number = this.MALong.calculate(prices);

		this.updateLastValue(shortValue, middleValue, longValue);
		const { MAShort: prevShort, MAMiddle: prevMiddle, MALong: prevLong }: IndicatorUpdateModelValues =
			this.indicatorService.getIndicatorValue(this.symbolID, 2).values;

		if ((prevLong.value > prevShort.value && longValue < shortValue) ||
			(isPartOfStrategy && longValue < shortValue)) {
			return Side.buy;
		} else if (+candles[candles.length - 1].min < prevMiddle.value) {
			return Side.sell;
		} else {
			return Side.none;
		}
	}

	private updateLastValue(shortValue: number, middleValue: number, longValue: number): void {
		this.indicatorService.handleIndicatorsUpdate({
			symbolID: this.symbolID,
			values: {
				MAShort: {
					value: shortValue,
					timestamp: this.timestamp,
				},
				MAMiddle: {
					value: middleValue,
					timestamp: this.timestamp,
				},
				MALong: {
					value: longValue,
					timestamp: this.timestamp,
				},
			},
		});
	}
}
