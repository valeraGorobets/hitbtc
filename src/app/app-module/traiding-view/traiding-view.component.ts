import { Component } from '@angular/core';
import { NotificationCandle } from '../../trade-module/models/notificationCandle';
import { Candle } from '../../trade-module/models/Candle';
import { CandlesChartFormat } from '../../trade-module/models/CandlesChartFormat';
import * as notificationCandle from './data.json';

@Component({
  selector: 'traiding-view',
  templateUrl: './traiding-view.component.html',
  styleUrls: ['./traiding-view.component.less'],
})
export class TraidingViewComponent {
  public notificationCandle = <NotificationCandle>(<any>notificationCandle);
  
  constructor() {
  }


  public plots: CandlesChartFormat[] = this.mapCandleToChartFormat(this.notificationCandle.params.data);

  private mapCandleToChartFormat(candles: Candle[]): CandlesChartFormat[] {
    return [Object.assign(new CandlesChartFormat(), {
      x: candles.map(candle => candle.timestamp),
      open: candles.map(candle => candle.open),
      close: candles.map(candle => candle.close),
      high: candles.map(candle => candle.max),
      low: candles.map(candle => candle.min),
    })];
  }
}
