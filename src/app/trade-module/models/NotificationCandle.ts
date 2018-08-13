import { Candle } from './candle';
import { Period } from './SharedConstants';

enum notificationMethod {
  snapshotCandles,
  updateCandles,
}

export class NotificationCandle {
  private jsonrpc: string;
  private method: notificationMethod;
  private params: {
    data: Candle[],
    symbol: string,
    period: Period,
  };
}
