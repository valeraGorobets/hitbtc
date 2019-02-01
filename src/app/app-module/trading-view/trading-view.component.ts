import { Component } from '@angular/core';
import { Candle } from '../../models/Candle';
import { ChartFormat } from '../../models/ChartFormats/ChartFormat';
import { CandlesChartFormat } from '../../models/ChartFormats/CandlesChartFormat';
import { InjectableObservables } from '../injectable-observables';
import { IndicatorPlotModel } from '../../services/indicator.service';

@Component({
  selector: 'trading-view',
  templateUrl: './trading-view.component.html',
  styleUrls: ['./trading-view.component.less'],
})

export class TradingViewComponent {
  public plots: ChartFormat[] = [];
  public savedCandles: Candle[] = [];
  public savedIndicators: IndicatorPlotModel = {};

  constructor(injectableObservables: InjectableObservables) {
    injectableObservables.candles$.subscribe(
      (candles: Candle[]) => this.handleCandlesUpdate(candles),
      e => this.handleError(e),
      () => this.handleOnComplete());

   injectableObservables.indicator$.subscribe(
      (indicators: IndicatorPlotModel) => this.handleIndicatorsUpdate(indicators),
      e => this.handleError(e),
      () => this.handleOnComplete());
  }

  private handleCandlesUpdate(newCandles: Candle[]): void {
    this.savedCandles = [...newCandles];
    this.reDrawPlots();
  }

  private handleIndicatorsUpdate(indicators: IndicatorPlotModel): void {
    this.savedIndicators = {...indicators};
    this.reDrawPlots();
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

  private mapCandleToChartFormat(candles: Candle[]): CandlesChartFormat {
    return Object.assign(new CandlesChartFormat(), {
      x: candles.map(candle => candle.timestamp),
      open: candles.map(candle => candle.open),
      close: candles.map(candle => candle.close),
      high: candles.map(candle => candle.max),
      low: candles.map(candle => candle.min),
    });
  }

  private handleError(e: Error): void {
    console.error('Error in TradingViewComponent in injectableObservables:', e);
  }

  private handleOnComplete(): void {
    console.log('InjectableObservables onCompleted');
  }
}
