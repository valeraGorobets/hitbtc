import { Component } from '@angular/core';
import { StrategyService } from '../investing-module/strategy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {

  constructor(strategyService: StrategyService) { }
}
