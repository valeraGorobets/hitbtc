import { Type } from '../../trade-module/position-constants';

class MA {
  private period: number;

  constructor(period: number = 9) {
    this.period = period;
  }

  public shouldInvest(prices: number[], isPartOfStrategy?: boolean): string {
    const lastPrice = prices[prices.length - 1];
    const prevPrice = prices[prices.length - 2];
    const lastMA = this.calculate(prices.slice(-this.period));
    const prevMA = this.calculate(prices.slice(-this.period - 1, -1));
    if ((prevMA > prevPrice && lastMA < lastPrice) ||
      (isPartOfStrategy && lastMA < lastPrice)) {
      return Type.LONG;
    } else if ((prevMA < prevPrice && lastMA > lastPrice) ||
      (isPartOfStrategy && lastMA > lastPrice)) {
      return Type.SHORT;
    } else {
      return Type.NONE;
    }
  }

  public calculate(prices: number[]): number {
    return prices.slice(-this.period).reduce((total, value) => total + value) / this.period;
  }
}

export default MA;
