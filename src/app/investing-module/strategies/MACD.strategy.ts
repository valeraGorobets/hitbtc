import { Side } from '../../models/SharedConstants';
import { Candle } from '../../models/Candle';
import { ReplaySubject } from 'rxjs';
import { Strategy } from './abstractStrategy';
import { IMACD, MACD } from '../indicators/macd';

export class MACDStrategy extends Strategy  {
  private field: string = 'close';

  public advisedInvestingSide(candles: Candle[], isPartOfStrategy?: boolean): Side {
    const macd = new MACD();
    const macdResult: IMACD = macd.calculate(candles.map(candle => +candle.close))
    const copy = JSON.parse(JSON.stringify(macdResult));
    console.log(candles[candles.length - 1]);
    console.log(copy);
    if (
      macdResult.MACD.pop() < 0 &&
      macdResult.histogram.pop() > 0 &&
      macdResult.histogram.pop() > 0 &&
      macdResult.histogram.pop() < 0) {
        console.log('byyyy')
        return Side.buy;
    }  else if (
      macdResult.histogram.pop() < 0 &&
      macdResult.histogram.pop() < 0 &&
      macdResult.histogram.pop() > 0) {
        console.log('sell')
        return Side.sell;
    }
    return Side.none;
  };

  public notifyAboutNewIndicatorValues(params: any): void {

  };
}
