import { Component, SimpleChanges, Input, OnChanges } from '@angular/core';
import Plotly from 'plotly.js-dist';
import { CandlesChartFormat } from '../../trade-module/models/ChartFormats/CandlesChartFormat';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less'],
})

export class ChartComponent implements OnChanges {
  @Input() public plots;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['plots'] ) {
      this.plots = changes.plots.currentValue;
      this.drawPlot(this.plots);
    }
  }

  private drawPlot(plots: CandlesChartFormat[]): void {
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
}
