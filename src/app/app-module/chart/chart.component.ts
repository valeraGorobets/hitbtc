import { Component, SimpleChanges, Input, OnChanges } from '@angular/core';
import Plotly from 'plotly.js-dist';
import { ChartFormat } from '../../trade-module/models/ChartFormats/ChartFormat';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less'],
})

export class ChartComponent implements OnChanges {
  @Input() public plots;
  private colorPalet: any = {};

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['plots'] ) {
      this.plots = changes.plots.currentValue;
      this.plots.filter(plot => plot.type === 'scatter').forEach(plot => plot.marker = { color: this.getColor(plot.name)});
      this.drawPlot(this.plots);
    }
  }

  private drawPlot(plots: ChartFormat[]): void {
    if (!Object.keys(plots).length) {
      return;
    }

    const layout = {
      width: 600,
      height: 600,
      dragmode: 'zoom',
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60,
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        type: 'date',
      },
      yaxis: {
        fixedrange: false,
      },
    };
    Plotly.newPlot('displayPlot', plots, layout);
  }

  private getColor(name: string): string {
    const availableColors = ['blue', 'MediumVioletRed', 'LightSalmon', 'DarkMagenta', 'Chartreuse'];
    if (!this.colorPalet.hasOwnProperty(name)) {
      this.colorPalet[name] = Object.keys(this.colorPalet).length % availableColors.length;
    }
    return availableColors[this.colorPalet[name]];
  }
}
