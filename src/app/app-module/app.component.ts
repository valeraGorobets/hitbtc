import { Component } from '@angular/core';
import { InvestingService } from '../investing-module/investing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {

  constructor(private investingService: InvestingService) { }

  private stopWatching(): void {
    this.investingService.stopWatching();
  }
}
