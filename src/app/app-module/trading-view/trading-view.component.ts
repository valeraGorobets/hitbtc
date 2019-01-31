import { Component } from '@angular/core';
import { Candle } from '../../models/Candle';
import { ChartFormat } from '../../models/ChartFormats/ChartFormat';
import { CandlesChartFormat } from '../../models/ChartFormats/CandlesChartFormat';
import { ScatterChartFormat } from '../../models/ChartFormats/ScatterChartFormat';

import { InjectableObservables } from '../injectable-observables';

interface IndicatorUpdateModel {
  value: number;
  timestamp: string;
}

@Component({
  selector: 'trading-view',
  templateUrl: './trading-view.component.html',
  styleUrls: ['./trading-view.component.less'],
})

export class TradingViewComponent {
  public plots: ChartFormat[] = [];
  public savedCandles: Candle[] = [];
  public savedIndicators = {};

  constructor(injectableObservables: InjectableObservables) {
    injectableObservables.candles$.subscribe(
      (candles: Candle[]) => this.handleCandlesUpdate(candles),
      e => this.handleError(e),
      () => this.handleOnComplete());

   injectableObservables.indicator$.subscribe(
      (x: IndicatorUpdateModel[]) => this.handleIndicatorsUpdate(x),
      e => this.handleError(e),
      () => this.handleOnComplete());
  }

  private handleCandlesUpdate(newCandles: Candle[]): void {
    this.savedCandles = [...newCandles];
    this.reDrawPlots();
  }

  private handleIndicatorsUpdate(x: IndicatorUpdateModel[]): void {
    Object.keys(x).forEach(plot => {
      if (!this.savedIndicators[plot]) {
        this.savedIndicators[plot] = new ScatterChartFormat();
        this.savedIndicators[plot].name = plot;
      }
      this.updateLastIndicator(this.savedIndicators[plot], x[plot]);
      this.savedIndicators[plot].x.push(x[plot].timestamp);
      this.savedIndicators[plot].y.push(x[plot].value);
    });
    this.reDrawPlots();
  }

  private updateLastIndicator(plotObject: ScatterChartFormat, updateIndicator: IndicatorUpdateModel): void {
    const lastUpdate: number = +new Date(updateIndicator.timestamp);
    const prevUpdate: number = +new Date(plotObject.x[plotObject.x.length - 1]);
    if (lastUpdate - prevUpdate === 0) {
      plotObject.x.pop();
      plotObject.y.pop();
    }
  }

  private reDrawPlots(): void {
    const viewingAmount = 85;
    const indicators: ChartFormat[] = Object.values(this.savedIndicators);
    indicators.forEach(indicator => {
      indicator.x = indicator.x.slice(-viewingAmount);
      indicator.y = indicator.y.slice(-viewingAmount);
    });
    const showingCandles = this.mapCandleToChartFormat(this.savedCandles.slice(-viewingAmount));
    this.plots = [showingCandles, ...indicators];
  }

  private handleError(e: Error): void {
    console.error('Error in TradingViewComponent in injectableObservables:', e);
  }

  private handleOnComplete(): void {
    console.log('InjectableObservables onCompleted');
  }

  private mapCandleToChartFormat(candles: Candle[]): CandlesChartFormat {
    return Object.assign(new CandlesChartFormat(), {
      x: candles.map(candle => candle.timestamp),
      open: candles.map(candle => candle.open),
      close: candles.map(candle => candle.close),
      high: candles.map(candle => candle.max),
      low: candles.map(candle => candle.min),
    });
  }
}
