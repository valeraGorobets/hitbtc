import { Candle } from './candle';
import { Period } from './position-constants';

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
