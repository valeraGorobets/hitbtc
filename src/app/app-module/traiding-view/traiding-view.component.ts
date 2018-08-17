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
  public savedParams: Candle[] = [];

  constructor(injectableObservables: InjectableObservables) {
    const pricesSubscription = injectableObservables.prices$.subscribe(
      (x: Candle[]) => this.drawPlot(x),
      e => this.handleError(e),
      () => this.handleOnComplete());
  }

  private drawPlot(newCandles: Candle[]): void {
    this.savedParams = [...this.savedParams, ...newCandles];
    const ss = this.mapCandleToChartFormat(this.savedParams);
    this.plots = [ss];
  }

  private handleError(e: Error): void {
    console.error('Error in TraidingViewComponent in injectableObservables.prices:', e);
  }

  private handleOnComplete(): void {
    console.log('InjectableObservables.prices onCompleted');
  }

  // public line: ScatterChartFormat = {
  //   x: this.notificationCandle.params.data.map(candle => candle.timestamp),
  //   y: this.notificationCandle.params.data.map(candle => 0.0465),
  //   type: 'scatter',
  //   name: 'MA',
  // }

  private mapCandleToChartFormat(candles: Candle[]): CandlesChartFormat {
    const ss = {
      x: candles.map(candle => candle.timestamp),
      open: candles.map(candle => candle.open),
      close: candles.map(candle => candle.close),
      high: candles.map(candle => candle.max),
      low: candles.map(candle => candle.min),
    };
    return Object.assign(new CandlesChartFormat(), ss);
  }
}
