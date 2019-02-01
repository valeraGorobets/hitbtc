import { Component } from '@angular/core';
import { InvestingService } from '../investing-module/investing.service';
import { CandleService } from '../services/candle.service';
import { InjectableObservables } from './injectable-observables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public symbol: string;

  constructor(
    private investingService: InvestingService,
    private candleService: CandleService,
    private injectableObservables: InjectableObservables,
    ) {
    this.injectableObservables.config$.subscribe((config: any) => {
      this.symbol = config.investingSymbol;
      this.candleService.connectToHitBtcApi(config.investingSymbol);
    });
  }

  private stopWatching(): void {
    this.investingService.stopWatching();
  }
}
