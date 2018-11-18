import { AbstractCryptoService } from './abstract-crypto-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WSService } from '../../libs/ws.service';

const socketURL = 'wss://api.hitbtc.com/api/2/ws';
const restEndPoint = 'https://api.hitbtc.com/api/2/public';

@Injectable({
  providedIn: 'root',
})

export class HitbtcApi implements AbstractCryptoService {
  private ws: WSService;
  private period: string = 'M1';

  constructor(
      private http: HttpClient,
    ) {
    console.log('HitbtcApi working');
  }

  public createConnection(): void {
    this.ws = new WSService(socketURL);
  }

  public subscribeCandles(symbol: string, period: string = this.period): void {
    this.ws.send({
      method: 'subscribeCandles',
      params: {
        symbol,
        period,
      },
      id: 123,
    });
  }

  public subscribeTrades(symbol: string): void {
    this.ws.send({
      method: 'subscribeTrades',
      params: {
        symbol,
      },
      id: 123,
    });
  }

  // cd c:\Program\ Files\ \(x86\)//Google/Chrome/Application/
  // ./chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
  public getOrderbook(symbol: string) {
    return this.http.get(`${restEndPoint}/orderbook/${symbol}?limit=1`);
  }

  public onMessage(): Observable<MessageEvent> {
    return this.ws.onMessage();
  }

  public closeConnection(delay: number = 0): void {
    setTimeout(() => this.ws.closeConnection(), delay);
  }
}
