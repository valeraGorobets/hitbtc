import { Injectable } from '@angular/core';
import { InjectableObservables } from '../app-module/injectable-observables';
import { ScatterChartFormat } from '../models/ChartFormats/ScatterChartFormat';

export interface IndicatorModel {
  value: number;
  timestamp: string;
}

export interface IndicatorUpdateModel {
  [indicatorName: string]: IndicatorModel;
}

export interface IndicatorPlotModel {
  [indicatorName: string]: ScatterChartFormat;
}

@Injectable({
  providedIn: 'root',
})

export class IndicatorService {
  public savedIndicators: IndicatorPlotModel = {};

  constructor(
    private injectableObservables: InjectableObservables,
  ) { }

  public handleIndicatorsUpdate(indicatorUpdateModel: IndicatorUpdateModel): void {
    Object.keys(indicatorUpdateModel).forEach(plotName => {
      if (!this.savedIndicators[plotName]) {
        this.savedIndicators[plotName] = new ScatterChartFormat();
        this.savedIndicators[plotName].name = plotName;
      }
      this.updateLastIndicator(this.savedIndicators[plotName], indicatorUpdateModel[plotName]);
      this.savedIndicators[plotName].x.push(indicatorUpdateModel[plotName].timestamp);
      this.savedIndicators[plotName].y.push(indicatorUpdateModel[plotName].value);
    });
    this.notifyAboutNewIndicatorValues();
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
