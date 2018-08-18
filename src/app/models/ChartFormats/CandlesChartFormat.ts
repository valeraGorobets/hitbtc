import { ChartFormat } from './ChartFormat';

export class CandlesChartFormat extends ChartFormat {
  public x: string[];
  public open: number[];
  public close: number[];
  public high: number[];
  public low: number[];
  public decreasing = {line: {color: 'red'}};
  public increasing = {line: {color: 'green'}};
  public line = {color: 'rgba(31,119,180,1)'};
  public type: string = 'candlestick';
  public name: string = '';
  public xaxis: string = 'x';
  public yaxis: string = 'y';
}
