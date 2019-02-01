import { Side } from '../../models/SharedConstants';
import { MA } from '../indicators/MA';
import { Candle } from '../../models/Candle';
import { InjectableObservables } from '../../app-module/injectable-observables';
import { Strategy } from './abstractStrategy';
import { IndicatorService } from '../../services/indicator.service';

export class ThreeMAStrategy implements Strategy {
  private field: string = 'close';
  private timestamp: string;

  private MAShort: MA = new MA(9);
  private MAMiddle: MA = new MA(13);
  private MALong: MA = new MA(21);

  constructor(
    private injectableObservables: InjectableObservables,
    private indicatorService: IndicatorService,
  ) {
    console.log('Strategy ThreeMAStrategy started');
    injectableObservables.candles$.subscribe((candles: Candle[]) => this.handleCandlesUpdate(candles));
  }

  private handleCandlesUpdate(candles: Candle[]): void {
    this.timestamp = candles[candles.length - 1].timestamp;
    const r = this.advisedInvestingSide(candles);
    console.log(`${r} - ${this.timestamp}`);
  }

  public advisedInvestingSide(candles: Candle[], isPartOfStrategy?: boolean): Side {
    const prices = candles.map(candle => +candle[this.field]);

    const shortValue = this.MAShort.calculate(prices);
    const middleValue = this.MAMiddle.calculate(prices);
    const longValue = this.MALong.calculate(prices);

    this.updateLastValue(shortValue, middleValue, longValue);
    const {MAShort: prevShort, MAMiddle: prevMiddle, MALong: prevLong} = this.indicatorService.getIndicatorValue(2);

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
    });
  }
}
