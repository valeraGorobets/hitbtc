import { AbstractCryptoService } from './abstract-crypto-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WSService } from '../../libs/ws.service';

@Injectable({
  providedIn: 'root',
})

export class HitbtcApi implements AbstractCryptoService {
  private ws: WSService;
  private symbol: string = 'BTCUSD';
  private period: string = 'M1';

  constructor() {
    console.log('HitbtcApi working');
  }

  public createConnection(url: string = 'wss://api.hitbtc.com/api/2/ws'): void {
    this.ws = new WSService(url);
  }

  public subscribeCandles(symbol: string = this.symbol, period: string = this.period): void {
    this.ws.send({
      method: 'subscribeCandles',
      params: {
        symbol,
        period,
      },
      id: 123,
    });
  }

  public subscribeTrades(symbol: string = this.symbol): void {
    this.ws.send({
      method: 'subscribeTrades',
      params: {
        symbol,
      },
      id: 123,
    });
  }

  public onMessage(): Observable<MessageEvent> {
    return this.ws.onMessage();
  }

  public closeConnection(delay: number = 0): void {
    setTimeout(() => this.ws.closeConnection(), delay);
  }
}
