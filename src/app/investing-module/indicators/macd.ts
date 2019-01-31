import { ema } from 'moving-averages';
import { sub, mul } from 'math-array';

export interface IMACD {
  MACD: number[];
  signal: number[];
  histogram: number[];
}

export class MACD {
  constructor(
    private slowPeriods: number = 26,
    private fastPeriods: number = 12,
    private signalPeriods: number = 9,
  ) {}

  public calculate(prices: number[]): IMACD {

    const MACDValue = sub(
      ema(prices, this.fastPeriods),
      ema(prices, this.slowPeriods),
      1,
    );
    const signal = ema(MACDValue, this.signalPeriods);
    const histogram = mul(2, sub(MACDValue, signal), 1);

    return {
      histogram: histogram.slice(-3),
      MACD: MACDValue.slice(-3),
      signal: signal.slice(-3),
    };
  }
}
