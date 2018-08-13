export class CandlesChartFormat {
  private x: string[];
  private open: number[];
  private close: number[];
  private high: number[];
  private low: number[];
  private decreasing = {line: {color: 'red'}};
  private increasing = {line: {color: 'green'}};
  private line = {color: 'rgba(31,119,180,1)'};
  private type: string = 'candlestick';
  private xaxis: string = 'x';
  private yaxis: string = 'y';
}
