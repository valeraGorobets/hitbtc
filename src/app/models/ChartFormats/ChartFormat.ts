import { IColor } from './CandlesChartFormat';

export class ChartFormat {
	public x: (string | Date)[];
	public y?: number[];
	public type: string;
	public name: string = '';
	public marker?: IColor;
}
