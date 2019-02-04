import { Component, SimpleChanges, Input, OnChanges } from '@angular/core';
import Plotly from 'plotly.js-dist';
import { ChartFormat } from '../../models/ChartFormats/ChartFormat';
import { Candle } from '../../models/Candle';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less'],
})

export class ChartComponent implements OnChanges {
  @Input() public plots;
  @Input() public chartID;

  private colorPalet: any = {};

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['plots'] ) {
      this.plots = changes.plots.currentValue;
      this.plots.filter(plot => plot.type === 'scatter').forEach(plot => plot.marker = { color: this.getColor(plot.name)});
      this.plots.forEach(plot => plot.x = plot.x.map(xAxis => new Date(xAxis)));
      this.drawPlot(this.plots);
      this.adjustWidth();
    }
  }

  private drawPlot(plots: ChartFormat[]): void {
    const gridcolor = 'rgb(54, 60, 78)';
    const paperColor = 'rgb(19, 23, 34)';
    const axisColor = 'rgb(192, 192, 194)';

    if (!Object.keys(plots).length) {
      return;
    }

    const layout = {
      dragmode: 'zoom',
      height: 400,
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60,
      },
      paper_bgcolor: paperColor,
      plot_bgcolor: paperColor,
      showlegend: false,
      width: 700,
      xaxis: {
        autorange: true,
        gridcolor,
        rangeslider: {visible: false},
        tickcolor: axisColor,
        tickfont: {
          color: axisColor,
          size: 12,
        },
        type: 'date',
      },
      yaxis: {
        // dtick: 0.5,
        fixedrange: false,
        gridcolor,
        side: 'right',
        tickcolor: axisColor,
        tickfont: {
          color: axisColor,
          size: 18,
        },
      },
    };
    Plotly.newPlot(`displayPlot${this.chartID}`, plots, layout);
  }

  private getColor(name: string): string {
    const availableColors = ['rgb(58, 133, 173)', 'rgb(255, 0, 255)', 'rgb(238, 239, 2)', 'DarkMagenta', 'Chartreuse'];
    if (!this.colorPalet.hasOwnProperty(name)) {
      this.colorPalet[name] = Object.keys(this.colorPalet).length % availableColors.length;
    }
    return availableColors[this.colorPalet[name]];
  }

  private adjustWidth(): void {
    const svgElements = document.getElementsByClassName('main-svg');
    [].forEach.call(svgElements, (svgElement) => {
      svgElement.attributes.width.value = 800;
    });
  }

  private convertTimeToCurrentTimezone(candle: Candle): Date {
    return new Date(candle.timestamp);
  }
}
