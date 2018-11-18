import { Side } from '../../models/SharedConstants';
import { Candle } from '../../models/Candle';
import { ReplaySubject } from 'rxjs';

export abstract class Strategy {
  public abstract advisedInvestingSide(candles: Candle[], isPartOfStrategy?: boolean): Side;
  public abstract notifyAboutNewIndicatorValues(params: any): void;
}
