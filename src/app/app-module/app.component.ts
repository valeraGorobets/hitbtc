import { Component } from '@angular/core';
import { StrategyService } from '../investing-module/strategy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {

  constructor(private strategyService: StrategyService) { }

  private stopWatching(): void {
    this.strategyService.stopWatching();
  }
}
