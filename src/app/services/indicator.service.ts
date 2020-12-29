import { Injectable } from '@angular/core';
import { ScatterChartFormat } from '../models/ChartFormats/ScatterChartFormat';
import { InjectableObservablesService } from './injectable-observables.service';

export interface IndicatorModel {
	value: number;
	timestamp: string;
}

export interface IndicatorNameValue {
	[indicatorName: string]: IndicatorModel;
}

export interface IndicatorUpdateModel {
	symbolID: string;
	values: IndicatorNameValue;
}

export interface IndicatorPlotModel {
	[symbolID: string]: {
		[indicatorName: string]: ScatterChartFormat;
	};
}

@Injectable({
	providedIn: 'root',
})

export class IndicatorService {
	public savedIndicators: IndicatorPlotModel = {};

	constructor(
		private injectableObservables: InjectableObservablesService,
	) {
	}

	public handleIndicatorsUpdate(indicatorUpdateModel: IndicatorUpdateModel): void {
		Object.keys(indicatorUpdateModel.values).forEach((plotName: string) => {
			const symbolID: string = indicatorUpdateModel.symbolID;
			const indicatorValuesOfPlot: IndicatorModel = indicatorUpdateModel.values[plotName];
			if (!this.savedIndicators[symbolID]) {
				this.savedIndicators[symbolID] = {};
			}
			if (!this.savedIndicators[symbolID][plotName]) {
				this.savedIndicators[symbolID][plotName] = new ScatterChartFormat();
				this.savedIndicators[symbolID][plotName].name = plotName;
			}
			this.updateLastIndicator(this.savedIndicators[symbolID][plotName], indicatorValuesOfPlot);
			this.savedIndicators[symbolID][plotName].x.push(indicatorValuesOfPlot.timestamp);
			this.savedIndicators[symbolID][plotName].y.push(indicatorValuesOfPlot.value);
		});
		this.notifyAboutNewIndicatorValues();
	}

	public getIndicatorValue(symbolID: string, period: number = 1): IndicatorUpdateModel {
		const indicatorValuePeriodsAgo: IndicatorUpdateModel = {
			symbolID,
			values: {},
		};
		Object.keys(this.savedIndicators[symbolID]).forEach((plotName: string) => {
			indicatorValuePeriodsAgo.values[plotName] = {
				value: this.savedIndicators[symbolID][plotName].y.slice(-period).shift(),
				timestamp: this.savedIndicators[symbolID][plotName].x.slice(-period).shift(),
			};
		});
		return indicatorValuePeriodsAgo;
	}

	private updateLastIndicator(plotObject: ScatterChartFormat, updateIndicator: IndicatorModel): void {
		const lastUpdate: number = +new Date(updateIndicator.timestamp);
		const prevUpdate: number = +new Date(plotObject.x[plotObject.x.length - 1]);
		if (lastUpdate - prevUpdate === 0) {
			plotObject.x.pop();
			plotObject.y.pop();
		}
	}

	private notifyAboutNewIndicatorValues(): void {
		this.injectableObservables.indicator$.next(this.savedIndicators);
	}
}
