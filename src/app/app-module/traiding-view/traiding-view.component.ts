import { Component } from '@angular/core';
import { NotificationCandle } from '../../trade-module/models/notificationCandle';
import { Candle } from '../../trade-module/models/Candle';
import { ChartFormat } from '../../trade-module/models/ChartFormats/ChartFormat';
import { CandlesChartFormat } from '../../trade-module/models/ChartFormats/CandlesChartFormat';
import { ScatterChartFormat } from '../../trade-module/models/ChartFormats/ScatterChartFormat';
import * as notificationCandle from './data.json';

@Component({
  selector: 'traiding-view',
  templateUrl: './traiding-view.component.html',
  styleUrls: ['./traiding-view.component.less'],
})
export class TraidingViewComponent {
  public notificationCandle = (notificationCandle as any) as NotificationCandle;

  constructor() {
  }

  public line: ScatterChartFormat = {
    x: this.notificationCandle.params.data.map(candle => candle.timestamp),
    y: this.notificationCandle.params.data.map(candle => 0.0465),
    type: 'scatter',
    name: 'MA',
  }
  public plots: ChartFormat[] = [this.mapCandleToChartFormat(this.notificationCandle.params.data), this.line];

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
