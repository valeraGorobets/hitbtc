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
    let candles: Candle[] = newCandles.slice(0, 1);
    if(this.savedCandles.length) {
      this.updateLastCandle(candles[0]); 
    }
    this.savedCandles = [...this.savedCandles, ...newCandles];
    this.reDrawPlots();
  }

  private updateLastCandle(updateCandle: Candle): void {
    const prevCandle = this.savedCandles[this.savedCandles.length - 1];
    const prevUpdate: number = +new Date(prevCandle.timestamp);
    const lastUpdate: number = +new Date(updateCandle.timestamp);
    if(lastUpdate - prevUpdate === 0) {
      this.savedCandles.pop();
    }
  }

  private handleIndicatorsUpdate(x: any): void {
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

  private updateLastIndicator(plotObject, updateIndicator): void {
    const lastUpdate: number = +new Date(updateIndicator.timestamp);
    const prevUpdate: number = +new Date(plotObject.x[plotObject.x.length - 1]);
    if(lastUpdate - prevUpdate === 0) {
      plotObject.x.pop();
      plotObject.y.pop();
    }
  }

  private reDrawPlots(): void {
    const viewingAmount = 60;
    const indicators: ChartFormat[] = Object.values(this.savedIndicators);
    indicators.forEach(indicator => {
      indicator.x = indicator.x.slice(-viewingAmount);
      indicator.y = indicator.y.slice(-viewingAmount);
    });
    const showingCandles = this.mapCandleToChartFormat(this.savedCandles.slice(-viewingAmount));
    this.plots = [showingCandles, ...indicators];
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
}
