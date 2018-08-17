import { Side } from '../../trade-module/models/SharedConstants';
import MA from '../indicators/MA';
import { Candle } from '../../trade-module/models/Candle';

export class MA9MA5Strategy {
  private MA5 = new MA(5);
  private MA9 = new MA(9);

  constructor(private field: string = 'close') {
    console.log('Strategy MA9MA5 started');
  }

  public shouldInvest(candles: Candle[], isPartOfStrategy?: boolean): Side {
    const lastCandle = candles[candles.length - 1];
    const prevCandle = candles[candles.length - 2];

    const prices = candles.map(candle => +candle[this.field]);

    const lastMA5 = this.MA5.calculate(prices.slice(-5));
    const prevMA5 = this.MA5.calculate(prices.slice(-6, -1));

    const lastMA9 = this.MA9.calculate(prices.slice(-9));
    const prevMA9 = this.MA9.calculate(prices.slice(-10, -1));

    if ((prevMA9 > prevMA5 && lastMA9 < lastMA5) ||
      (isPartOfStrategy && lastMA9 < lastMA5)) {
      return Side.buy;
    } else if ((prevMA5 < prevMA9 && lastMA5 > lastMA9) ||
      (isPartOfStrategy && lastMA5 > lastMA9)) {
      return Side.sell;
    } else {
      return Side.none;
    }
  }
}
