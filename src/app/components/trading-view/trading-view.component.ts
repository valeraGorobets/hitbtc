import { Component, Input } from '@angular/core';
import { Candle } from '../../models/Candle';
import { CandlesChartFormat } from '../../models/ChartFormats/CandlesChartFormat';
import { ChartFormat } from '../../models/ChartFormats/ChartFormat';
import { ScatterChartFormat } from '../../models/ChartFormats/ScatterChartFormat';
import { ISavedCandles } from '../../services/candle.service';
import { IndicatorPlotModel } from '../../services/indicator.service';
import { InjectableObservablesService } from '../../services/injectable-observables.service';

@Component({
	selector: 'trading-view',
	templateUrl: './trading-view.component.html',
	styleUrls: ['./trading-view.component.less'],
})

export class TradingViewComponent {
	@Input() public observableSymbol: string;

	private savedCandles: Candle[] = [];
	private savedIndicators: {
		[indicatorName: string]: ScatterChartFormat;
	} = {};

	public plots: ChartFormat[] = [];

	constructor(
		injectableObservables: InjectableObservablesService,
	) {
		injectableObservables.candles$.subscribe(
			(candlesUpdate: ISavedCandles) => this.handleCandlesUpdate(candlesUpdate),
			(e: Error) => this.handleError(e),
			() => this.handleOnComplete());

		injectableObservables.indicator$.subscribe(
			(indicatorsUpdate: IndicatorPlotModel) => this.handleIndicatorsUpdate(indicatorsUpdate),
			(e: Error) => this.handleError(e),
			() => this.handleOnComplete());
	}

	private handleCandlesUpdate(newCandles: ISavedCandles): void {
		const candles: Candle[] = newCandles[this.observableSymbol] || [];
		this.savedCandles = [...candles];
		this.reDrawPlots();
	}

	private handleIndicatorsUpdate(indicators: IndicatorPlotModel): void {
		this.savedIndicators = { ...indicators[this.observableSymbol] };
		this.reDrawPlots();
	}

	private reDrawPlots(): void {
		const viewingAmount: number = 35;
		const indicators: ChartFormat[] = Object.values(this.savedIndicators);
		indicators.forEach((indicator: ChartFormat) => {
			indicator.x = indicator.x.slice(-viewingAmount);
			indicator.y = indicator.y.slice(-viewingAmount);
		});
		const showingCandles: CandlesChartFormat = this.mapCandleToChartFormat(this.savedCandles.slice(-viewingAmount));
		this.plots = [showingCandles, ...indicators];
	}

	private mapCandleToChartFormat(candles: Candle[]): CandlesChartFormat {
		return Object.assign(new CandlesChartFormat(), {
			x: candles.map((candle: Candle) => candle.timestamp),
			open: candles.map((candle: Candle) => candle.open),
			close: candles.map((candle: Candle) => candle.close),
			high: candles.map((candle: Candle) => candle.max),
			low: candles.map((candle: Candle) => candle.min),
		});
	}

	private handleError(e: Error): void {
		console.error('Error in TradingViewComponent in injectableObservables:', e);
	}

	private handleOnComplete(): void {
		console.log('InjectableObservablesService onCompleted');
	}
}
