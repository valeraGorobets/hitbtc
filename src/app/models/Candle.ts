import { Period } from './SharedConstants';

enum notificationMethod {
  snapshotCandles = 'snapshotCandles',
  updateCandles = 'updateCandles',
}

export class Candle {
  public timestamp: string | Date;
  public open: string;
  public close: string;
  public min: string;
  public max: string;
  public volume: string;
  public volumeQuote: string;
}

// TODO: change method and period types
export class NotificationCandle {
  public jsonrpc: string;
  public method: string;
  public params: {
    data: Candle[],
    symbol: string,
    period: string,
  };
}
