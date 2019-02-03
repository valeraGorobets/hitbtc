import { Side } from '../../models/SharedConstants';
import { MA } from '../indicators/MA';
import { Candle } from '../../models/Candle';
import { InjectableObservables } from '../../app-module/injectable-observables';
import { Strategy } from './abstractStrategy';
import { IndicatorService } from '../../services/indicator.service';
import { ISavedCandles } from '../../services/candle.service';

export class ThreeMAStrategy implements Strategy {
  private field: string = 'close';
  private timestamp: string;

  private MAShort: MA = new MA(9);
  private MAMiddle: MA = new MA(13);
  private MALong: MA = new MA(21);

  constructor(
    private symbolID: string,
    private injectableObservables: InjectableObservables,
    private indicatorService: IndicatorService,
  ) {
    console.log('Strategy ThreeMAStrategy started');
    injectableObservables.candles$.subscribe((candlesUpdate: ISavedCandles) => this.handleCandlesUpdate(candlesUpdate));
  }

  private handleCandlesUpdate(candlesUpdate: ISavedCandles): void {
    const candles = candlesUpdate[this.symbolID] || [];
    this.timestamp = candles[candles.length - 1].timestamp;
    const advisedResult = this.advisedInvestingSide(candles);
    this.injectableObservables.strategyAction$.next({
      symbolID: this.symbolID,
      advisedResult,
      timestamp: this.timestamp,
    });
    // console.log(`${this.symbolID} - ${advisedResult} - ${this.timestamp}`);
  }

  public advisedInvestingSide(candles: Candle[], isPartOfStrategy?: boolean): Side {
    const prices = candles.map(candle => +candle[this.field]);

    const shortValue = this.MAShort.calculate(prices);
    const middleValue = this.MAMiddle.calculate(prices);
    const longValue = this.MALong.calculate(prices);

    this.updateLastValue(shortValue, middleValue, longValue);
    const {MAShort: prevShort, MAMiddle: prevMiddle, MALong: prevLong} = this.indicatorService.getIndicatorValue(this.symbolID, 2).values;

    if ((prevLong > prevShort && longValue < shortValue) ||
      (isPartOfStrategy && longValue < shortValue)) {
      return Side.buy;
    } else if ((prevMiddle < prevShort && middleValue > shortValue) ||
      (isPartOfStrategy && middleValue > shortValue)) {
      return Side.sell;
    } else {
      return Side.none;
    }
  }

  private updateLastValue(shortValue: number, middleValue: number, longValue: number): void {
    this.indicatorService.handleIndicatorsUpdate({
      symbolID: this.symbolID,
      values: {
        MAShort: {
          value: shortValue,
          timestamp: this.timestamp,
        },
        MAMiddle: {
          value: middleValue,
          timestamp: this.timestamp,
        },
        MALong: {
          value: longValue,
          timestamp: this.timestamp,
        },
      },
    });
  }
}
