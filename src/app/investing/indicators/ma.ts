import {Type} from '../../trade/position-constants';

class MA {
  private period: number;

  constructor(period = 9) {
    this.period = period;
  }

  public shouldInvest(prices, isPartOfStrategy?) {
    const lastPrice = prices[prices.length - 1];
    const prevPrice = prices[prices.length - 2];
    const lastMA = this.calculate(prices.slice(-this.period));
    const prevMA = this.calculate(prices.slice(-this.period-1, -1));
    if((prevMA > prevPrice && lastMA < lastPrice) ||
      (isPartOfStrategy && lastMA < lastPrice)) {
      return Type.LONG;
    } else if((prevMA < prevPrice && lastMA > lastPrice) || 
      (isPartOfStrategy && lastMA > lastPrice)) {
      return Type.SHORT;
    } else {
      return Type.NONE;
    }
  }

  public calculate(prices) {
    return prices.slice(-this.period).reduce((total, value) => total + value) / this.period;
  }
}

export default MA;