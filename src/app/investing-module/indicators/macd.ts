import { ema } from 'moving-averages';
import { sub, mul } from 'math-array';

export interface IMACD {
  MACD: number[],
  signal: number[],
  histogram: number[],
}

export class MACD {
  constructor(
    private slowPeriods: number = 26,
    private fastPeriods: number = 12,
    private signalPeriods: number = 9
  ) {}

  public calculate(prices: number[]): IMACD {

    const MACD = sub(
      ema(prices, this.fastPeriods),
      ema(prices, this.slowPeriods),
      1
    )
    const signal = ema(MACD, this.signalPeriods)
    const histogram = mul(2, sub(MACD, signal), 1);

    return {
      MACD: MACD.slice(-3),
      signal: signal.slice(-3),
      histogram: histogram.slice(-3),
    }
  }
}
