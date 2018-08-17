import { Side } from '../../trade-module/models/SharedConstants';
import MA from '../indicators/MA';
import { Candle } from '../../trade-module/models/Candle';
import { InjectableObservables } from '../../app-module/injectable-observables';

export class MA9MA5Strategy {
  private field: string = 'close';
  private MA5 = new MA(5);
  private MA9 = new MA(9);

  constructor(private injectableObservables: InjectableObservables) {
    console.log('Strategy MA9MA5 started');
  }

  public shouldInvest(candles: Candle[], isPartOfStrategy?: boolean): Side {
    const prices = candles.map(candle => +candle[this.field]);

    const lastMA5 = this.MA5.calculate(prices.slice(-5));
    const prevMA5 = this.MA5.calculate(prices.slice(-6, -1));

    const lastMA9 = this.MA9.calculate(prices.slice(-9));
    const prevMA9 = this.MA9.calculate(prices.slice(-10, -1));

    this.injectableObservables.indicator$.next({
      MA5: {
        value: lastMA5,
        timestamp: candles[candles.length - 1].timestamp,
      },
      MA9: {
        value: lastMA9,
        timestamp: candles[candles.length - 1].timestamp,
      },
    });

    if ((prevMA9 > prevMA5 && lastMA9 < lastMA5) ||
      (isPartOfStrategy && lastMA9 < lastMA5)) {
      console.log(candles[candles.length - 1].timestamp);
      return Side.buy;
    } else if ((prevMA9 < prevMA5 && lastMA9 > lastMA5) ||
      (isPartOfStrategy && lastMA9 > lastMA5)) {
      console.log(candles[candles.length - 1].timestamp);
      return Side.sell;
    } else {
      return Side.none;
    }
  }
}
