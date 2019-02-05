import { Candle } from './Candle';
import { Period } from './SharedConstants';

enum notificationMethod {
  snapshotCandles,
  updateCandles,
}

export class NewOrderResponse {
  private jsonrpc: string;
  private method: notificationMethod;
  private params: {
    data: Candle[],
    symbol: string,
    period: Period,
  };
}
