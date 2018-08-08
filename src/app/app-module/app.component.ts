import { Component } from '@angular/core';
import { HitbtcApiService } from '../crypto-exchange-module/hitbtc-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public title = 'hitbtc';

  constructor(private hitbtcApiService: HitbtcApiService) {
    this.hitbtcApiService.createConnection();
    this.hitbtcApiService.subscribeCandles();
    this.hitbtcApiService.onMessage()
      .subscribe((message: any) => {
       console.log(message);
      });
  }

}
