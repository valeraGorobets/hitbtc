import { Side } from '../../trade-module/models/position-constants';

export default class MA {
  private period: number;

  constructor(period: number = 9) {
    this.period = period;
  }

  public shouldInvest(prices: number[], isPartOfStrategy?: boolean): Side {
    const lastPrice = prices[prices.length - 1];
    const prevPrice = prices[prices.length - 2];
    const lastMA = this.calculate(prices.slice(-this.period));
    const prevMA = this.calculate(prices.slice(-this.period - 1, -1));
    if ((prevMA > prevPrice && lastMA < lastPrice) ||
      (isPartOfStrategy && lastMA < lastPrice)) {
      return Side.buy;
    } else if ((prevMA < prevPrice && lastMA > lastPrice) ||
      (isPartOfStrategy && lastMA > lastPrice)) {
      return Side.sell;
    } else {
      return Side.none;
    }
  }

  public calculate(prices: number[]): number {
    return prices.slice(-this.period).reduce((total, value) => total + value) / this.period;
  }
}
