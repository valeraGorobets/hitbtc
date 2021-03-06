export class MA {
	private readonly period: number;

	constructor(period: number = 9) {
		this.period = period;
	}

	public calculate(prices: number[]): number {
		return prices.slice(-this.period).reduce((total: number, value: number) => total + value) / this.period;
	}
}
