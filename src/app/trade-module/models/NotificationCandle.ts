import { Candle } from './candle';
import { Period } from './SharedConstants';

enum notificationMethod {
  snapshotCandles = 'snapshotCandles',
  updateCandles = 'updateCandles',
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
