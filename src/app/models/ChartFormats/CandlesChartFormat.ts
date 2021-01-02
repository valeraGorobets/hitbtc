import { ChartFormat } from './ChartFormat';

export interface IColor {
	color: string;
}

export class CandlesChartFormat extends ChartFormat {
	public x: string[];
	public open: number[];
	public close: number[];
	public high: number[];
	public low: number[];
	public decreasing: { line: IColor } = { line: { color: 'rgb(235, 77, 92)' } };
	public increasing: { line: IColor } = { line: { color: 'rgb(83, 185, 135)' } };
	public line: IColor = { color: 'rgba(31,119,180,1)' };
	public type: string = 'candlestick';
	public name: string = '';
	public xaxis: string = 'x';
	public yaxis: string = 'y';
}
