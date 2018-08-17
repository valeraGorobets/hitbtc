import { Side } from '../../trade-module/models/SharedConstants';
import MA from '../indicators/MA';
import { Candle } from '../../trade-module/models/Candle';
import { InjectableObservables } from '../../app-module/injectable-observables';

export default class MALongMAShortStrategy {
  private field: string = 'close';
  private MAShort: MA;
  private MALong: MA;

  constructor(
    private injectableObservables: InjectableObservables,
    private short: number,
    private long: number,
    ) {
    this.MAShort = new MA(short);
    this.MALong = new MA(long);
    console.log('Strategy MALongMAShort started');
  }

  public shouldInvest(candles: Candle[], isPartOfStrategy?: boolean): Side {
    const prices = candles.map(candle => +candle[this.field]);

    const lastShort = this.MAShort.calculate(prices.slice(-this.short));
    const prevShort = this.MAShort.calculate(prices.slice(-this.short - 1, -1));

    const lastLong = this.MALong.calculate(prices.slice(-this.long));
    const prevLong = this.MALong.calculate(prices.slice(-this.long - 1, -1));

    this.notifyAboutNewIndicatorValues(lastShort, lastLong, candles[candles.length - 1].timestamp);

    if ((prevLong > prevShort && lastLong < lastShort) ||
      (isPartOfStrategy && lastLong < lastShort)) {
      console.log(candles[candles.length - 1].timestamp);
      return Side.buy;
    } else if ((prevLong < prevShort && lastLong > lastShort) ||
      (isPartOfStrategy && lastLong > lastShort)) {
      console.log(candles[candles.length - 1].timestamp);
      return Side.sell;
    } else {
      return Side.none;
    }
  }

  private notifyAboutNewIndicatorValues(lastShort: number, lastLong: number, timestamp: string): void {
    this.injectableObservables.indicator$.next({
      MAShort: {
        value: lastShort,
        timestamp,
      },
      MALong: {
        value: lastLong,
        timestamp,
      },
    });
  }
}
