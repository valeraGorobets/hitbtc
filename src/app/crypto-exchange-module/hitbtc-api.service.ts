import { AbstractCryptoService } from './abstract-crypto-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WSService } from '../../libs/ws.service';
import { map } from 'rxjs/operators';

const socketURL = 'wss://api.hitbtc.com/api/2/ws';
const backendPoint = 'http://localhost:8000/backend';
const restEndPoint = 'https://api.hitbtc.com/api/2/public';

@Injectable({
  providedIn: 'root',
})

export class HitBTCApi implements AbstractCryptoService {
  private ws: WSService;
  private period: string = 'M1';

  constructor(
      private http: HttpClient,
    ) {
    console.log('HitBTCApi working');
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

  public getSymbolDescription(symbol: string): Observable<any> {
    return this.http.get(`${backendPoint}/symbol/${symbol}`);
  }

  public getOrderbook(symbol: string): any {
    return this.http.get(`${backendPoint}/getOrderbook/${symbol}`);
  }

  public onMessage(): Observable<MessageEvent> {
    return this.ws.onMessage();
  }

  public closeConnection(delay: number = 0): void {
    setTimeout(() => this.ws.closeConnection(), delay);
  }

  public getBalance(): any {
    return this.http.get(`${backendPoint}/trading/balance`)
      .pipe(
        map((response: any) => JSON.parse(response)
          .filter((currency: any) => !!(+currency.available || +currency.reserved))),
      );
  }

  public getHistoryOrder(): any {
    return this.http.get(`${backendPoint}/history/order`)
      .pipe(
        map((response: any) => JSON.parse(response)),
      );
  }
}
