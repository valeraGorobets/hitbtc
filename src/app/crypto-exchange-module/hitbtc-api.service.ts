import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WSService } from '../../libs/ws.service';

@Injectable({
  providedIn: 'root',
})
export class HitbtcApiService {
  private ws: WSService;

  public createConnection(url: string = 'wss://api.hitbtc.com/api/2/ws'): void {
    this.ws = new WSService(url);
    setTimeout(() => this.closeConnection(), 5000);
  }

  public subscribeCandles(): void {
    const message = {
      method: 'subscribeCandles',
      params: {
        symbol: 'ETHBTC',
        period: 'M1',
      },
      id: 123,
    };
    this.ws.send(message);
  }

  public onMessage(): Observable<MessageEvent> {
    return this.ws.onMessage();
  }

  public closeConnection(): void {
    this.ws.closeConnection();
  }
}
