import { Component } from '@angular/core';
import { NotificationCandle } from '../../trade-module/models/notificationCandle';
import { Candle } from '../../trade-module/models/Candle';
import { ChartFormat } from '../../trade-module/models/ChartFormats/ChartFormat';
import { CandlesChartFormat } from '../../trade-module/models/ChartFormats/CandlesChartFormat';
import { ScatterChartFormat } from '../../trade-module/models/ChartFormats/ScatterChartFormat';
import { Subject } from 'rxjs';

import { InjectableObservables } from '../injectable-observables';

@Component({
  selector: 'traiding-view',
  templateUrl: './traiding-view.component.html',
  styleUrls: ['./traiding-view.component.less'],
})

export class TraidingViewComponent {
  public plots: ChartFormat[] = [];
  public savedCandles: Candle[] = [];
  public savedIndicators = {};

  constructor(injectableObservables: InjectableObservables) {
    const candleSubscription = injectableObservables.candles$.subscribe(
      (x: Candle[]) => this.handleCandlesUpdate(x),
      e => this.handleError(e),
      () => this.handleOnComplete());

    const indicatorsSubscription = injectableObservables.indicator$.subscribe(
      (x: any) => this.handleIndicatorsUpdate(x),
      e => this.handleError(e),
      () => this.handleOnComplete());
  }

  private handleCandlesUpdate(newCandles: Candle[]): void {
    this.savedCandles = [...this.savedCandles, ...newCandles];
    this.reDrawPlots();
  }

  private handleIndicatorsUpdate(x: any): void {
    Object.keys(x).forEach(plot => {
      if (!this.savedIndicators[plot]) {
        this.savedIndicators[plot] = this.createScatterPlot(plot);
      }
      this.savedIndicators[plot].x.push(x[plot].timestamp);
      this.savedIndicators[plot].y.push(x[plot].value);
    });
    this.reDrawPlots();
  }

  private reDrawPlots(): void {
    const indicators: ChartFormat[] = Object.values(this.savedIndicators);
    this.plots = [this.mapCandleToChartFormat(this.savedCandles), ...indicators];
  }

  private handleError(e: Error): void {
    console.error('Error in TraidingViewComponent in injectableObservables:', e);
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

  private createScatterPlot(name: string): ScatterChartFormat {
    return {
      name,
      type: 'scatter',
      x: [],
      y: [],
    };
  }
}
