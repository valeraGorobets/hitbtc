import { Component } from '@angular/core';
import { NotificationCandle } from '../../trade-module/models/notificationCandle';
import { Candle } from '../../trade-module/models/Candle';
import { CandlesChartFormat } from '../../trade-module/models/CandlesChartFormat';

@Component({
  selector: 'traiding-view',
  templateUrl: './traiding-view.component.html',
  styleUrls: ['./traiding-view.component.less'],
})
export class TraidingViewComponent {

  constructor() { }

  public notificationCandle: NotificationCandle = {
    jsonrpc: '2.0',
    method: 'snapshotCandles',
    params: {
      data: [
        {
          timestamp: '2017-10-19T15:00:00.000Z',
          open: '0.054801',
          close: '0.054625',
          min: '0.054601',
          max: '0.054894',
          volume: '380.750',
          volumeQuote: '20.844237223',
        },
        {
          timestamp: '2017-10-19T15:30:00.000Z',
          open: '0.054616',
          close: '0.054618',
          min: '0.054420',
          max: '0.054724',
          volume: '348.527',
          volumeQuote: '19.011854364',
        },
        {
          timestamp: '2017-10-19T16:00:00.000Z',
          open: '0.054587',
          close: '0.054626',
          min: '0.054408',
          max: '0.054768',
          volume: '194.014',
          volumeQuote: '10.595416973',
        },
        {
          timestamp: '2017-10-19T16:30:00.000Z',
          open: '0.054614',
          close: '0.054443',
          min: '0.054339',
          max: '0.054724',
          volume: '141.213',
          volumeQuote: '7.706358298',
        },
      ],
      symbol: 'ETHBTC',
      period: 'M30',
    },
  };

  public plots: Candle[] = this.mapCandleToChartFormat(this.notificationCandle.params.data);

  private mapCandleToChartFormat(candles: Candle[]): CandlesChartFormat {
    return [Object.assign(new CandlesChartFormat(), {
      x: candles.map(candle => candle.timestamp),
      open: candles.map(candle => candle.open),
      close: candles.map(candle => candle.close),
      high: candles.map(candle => candle.max),
      low: candles.map(candle => candle.min),
    })];
  }
}
