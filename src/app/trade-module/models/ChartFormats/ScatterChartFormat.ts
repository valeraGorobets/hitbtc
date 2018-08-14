import { ChartFormat } from './ChartFormat';

export class ScatterChartFormat extends ChartFormat {
  public x: string[];
  public y: number[];
  public type: string = 'scatter';
  public name: string = '';
}
