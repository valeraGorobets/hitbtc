import { Component, Input } from '@angular/core';
import { Candle } from '../../models/Candle';
import { ChartFormat } from '../../models/ChartFormats/ChartFormat';
import { CandlesChartFormat } from '../../models/ChartFormats/CandlesChartFormat';
import { InjectableObservables } from '../injectable-observables';
import { IndicatorPlotModel } from '../../services/indicator.service';
import { ISavedCandles } from '../../services/candle.service';
import { ScatterChartFormat } from '../../models/ChartFormats/ScatterChartFormat';

@Component({
  selector: 'trading-view',
  templateUrl: './trading-view.component.html',
  styleUrls: ['./trading-view.component.less'],
})

export class TradingViewComponent {
  @Input() public observableSymbol: string;

  private savedCandles: Candle[] = [];
  private savedIndicators: {
    [indicatorName: string]: ScatterChartFormat;
  } = {};

  public plots: ChartFormat[] = [];

  constructor(
    injectableObservables: InjectableObservables,
  ) {
    injectableObservables.candles$.subscribe(
      (candles: Candle[]) => this.handleCandlesUpdate(candles[this.observableSymbol]),
      e => this.handleError(e),
      () => this.handleOnComplete());

   injectableObservables.indicator$.subscribe(
      (indicators: IndicatorPlotModel) => this.handleIndicatorsUpdate(indicators[this.observableSymbol]),
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
    const viewingAmount = 35;
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
