import * as notificationCandle from '../../app-module/trading-view/data.json';
import { AbstractCryptoService } from '../../crypto-exchange-module/abstract-crypto-service';
import { Candle, NotificationCandle } from '../../models/Candle';
import { IMACD, MACD } from '../indicators/macd';
import { InjectableObservables } from '../../app-module/injectable-observables';
import { Side } from '../../models/SharedConstants';
import { Strategy } from './abstractStrategy';

export class MACDStrategy extends Strategy  {
  private field: string = 'close';
  private savedCandles: Candle[] = [];
  private macd = new MACD();
  private notificationCandle: NotificationCandle = (notificationCandle as any) as NotificationCandle;


  constructor(
      private injectableObservables: InjectableObservables,
      private cryptoExchangeService: AbstractCryptoService,
    ) {
    super();
    // this.connectToLocalData();
    this.connectToHitBtcApi();
  }

  public advisedInvestingSide(candles: Candle[], isPartOfStrategy?: boolean): Side {
    const macdResult: IMACD = this.macd.calculate(candles.map(candle => +candle.close))
    if (
      macdResult.MACD.pop() < 0 &&
      macdResult.histogram.pop() > 0 &&
      macdResult.histogram.pop() > 0 &&
      macdResult.histogram.pop() < 0) {
        return Side.buy;
    }  else if (
      macdResult.histogram.pop() < 0 &&
      macdResult.histogram.pop() < 0 &&
      macdResult.histogram.pop() > 0) {
        return Side.sell;
    }
    return Side.none;
  };

  public notifyAboutNewIndicatorValues(params: any): void {

  };

  private connectToLocalData(): void {
    const data = this.notificationCandle.params.data;
    const history = data.slice(0, 25);
    this.updateSavedCandles(this.candleToNotificationCandle('snapshotCandles', history));

    const restData = data.slice(25);
    for (let i = 0; i < restData.length; i++) {
      setTimeout(() => {
        this.handleUpdateCandles(this.candleToNotificationCandle('updateCandles', [restData[i]]));
      }, i * 0);
    }
    setTimeout(() => {
      // console.log(this.openedTrade);
    });
  }

  private connectToHitBtcApi(): void {
    this.cryptoExchangeService.createConnection();
    this.cryptoExchangeService.subscribeCandles();
    this.cryptoExchangeService.onMessage()
      .subscribe((message: any) => {
        switch (message.method) {
          case 'snapshotCandles':
            this.updateSavedCandles(message);
          break;
          case 'updateCandles':
            this.handleUpdateCandles(message);
          break;
          default:
            console.error('Cant handle unknown method');
            console.error(message);
            break;
        }
      });
  }

  private handleUpdateCandles(candle: NotificationCandle): void {
    this.updateSavedCandles(candle);
    this.injectableObservables.positionAction$.next({
      candle,
      side: this.advisedInvestingSide(this.savedCandles),
    });
  }

  private updateSavedCandles(message: NotificationCandle): void {
    let candles: Candle[] = message.params.data;
    this.injectableObservables.candles$.next(candles);
    if (message.method === 'updateCandles') {
      this.updatePrevCandle(candles[0]);
      candles = candles.slice(0, 1);
    }
    this.savedCandles = [...this.savedCandles, ...candles];
  }

  private updatePrevCandle(updateCandle: Candle): void {
    const prevCandle = this.savedCandles[this.savedCandles.length - 1];
    const prevUpdate: number = +new Date(prevCandle.timestamp);
    const lastUpdate: number = +new Date(updateCandle.timestamp);
    if (lastUpdate - prevUpdate === 0) {
      this.savedCandles.pop();
    }
  }

  private candleToNotificationCandle(method: string, el: Candle[]): NotificationCandle {
    return {
      jsonrpc: '2.0',
      method,
      params: {
        data: el,
        symbol: 'ETHBTC',
        period: 'M1',
      },
    };
  }
}
