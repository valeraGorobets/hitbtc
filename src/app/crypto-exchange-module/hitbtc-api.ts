import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WSService } from '../../libs/ws.service';

@Injectable({
  providedIn: 'root',
})

export class HitbtcApi {
  private ws: WSService;
  private symbol: string = 'BTCUSD';
  constructor() {
    console.log('HitbtcApi working');
  }

  public createConnection(url: string = 'wss://api.hitbtc.com/api/2/ws'): void {
    this.ws = new WSService(url);
  }

  public subscribeCandles(): void {
    const message = {
      method: 'subscribeCandles',
      params: {
        symbol: this.symbol,
        period: 'M1',
      },
      id: 123,
    };
    this.ws.send(message);
  }

  public subscribeTrades(): void {
    const message = {
      method: 'subscribeTrades',
      params: {
        symbol: this.symbol,
      },
      id: 123,
    };
    this.ws.send(message);
  }

  public onMessage(): Observable<MessageEvent> {
    return this.ws.onMessage();
  }

  public closeConnection(delay: number = 0): void {
    setTimeout(() => this.ws.closeConnection(), delay);
  }
}
