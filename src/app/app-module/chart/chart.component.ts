import { Component, SimpleChanges, Input, OnChanges } from '@angular/core';
import Plotly from 'plotly.js-dist';
import { ChartFormat } from '../../models/ChartFormats/ChartFormat';

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
      height: 800,
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60,
      },
      paper_bgcolor: paperColor,
      plot_bgcolor: paperColor,
      showlegend: false,
      width: 1500,
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
    Plotly.newPlot('displayPlot', plots, layout);
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
    if (svgElements && svgElements[0]) {
      (svgElements[0] as any).attributes.width.value = 1600;
    }
  }
}
