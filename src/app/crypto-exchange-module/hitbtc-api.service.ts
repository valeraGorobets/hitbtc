import { AbstractCryptoService } from './abstract-crypto-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { WSService } from '../../libs/ws.service';
import { INewOrder } from '../models/Order';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { map } from 'rxjs/operators';

const socketURL = 'wss://api.hitbtc.com/api/2/ws';
const backendPoint = 'http://localhost:8080/backend';

const timeout = 1500;

function getSignature(message: string, secret: string): string {
  return base64toHEX(
    hmacSHA256(message, secret).toString(Base64),
  );
}

function base64toHEX(base64: string): string {
  const raw = atob(base64);
  let HEX = '';
  for (let i = 0; i < raw.length; i++ ) {
    const _hex = raw.charCodeAt(i).toString(16);
    HEX += (_hex.length === 2 ? _hex : '0' + _hex);
  }
  return HEX;
}

@Injectable({
  providedIn: 'root',
})

export class HitBTCApi implements AbstractCryptoService {
  private ws: {
    [symbol: string]: WSService,
  } = {};
  private period: string = 'M1';
  private keys: any = {};

  constructor(
      private http: HttpClient,
    ) {
    console.log('HitBTCApi working');
    this.http.get('./../../../backend/keys.json')
      .subscribe(keys => this.keys = keys);
  }

  private getKeysById(id: number): any {
    if (!Object.keys(this.keys).length) {
      return ;
    }
    return this.keys.values[this.keys.mapping[id.toString()]];
  }

  public createConnection(symbol: string): void {
    console.log('create connection');
    this.ws[symbol] = new WSService(socketURL);
  }

  // subscriptions
  public subscribeCandles(symbol: string, period: string = this.period): void {
    this.ws[symbol].send({
      method: 'subscribeCandles',
      params: {
        symbol,
        period,
      },
      id: 123,
    });
  }

  public subscribeTrades(symbol: string): void {
    this.ws[symbol].send({
      method: 'subscribeTrades',
      params: {
        symbol,
      },
      id: 123,
    });
  }

  public login(method: string, id: number): void {
    const {api: pKey, secret: sKey} = this.getKeysById(id);
    const nonce = 'secretSign12345';
    this.ws[method] = new WSService(socketURL);
    this.ws[method].send({
      method: 'login',
      params: {
        algo: 'HS256',
        pKey,
        nonce,
        signature: getSignature(nonce, sKey),
      },
      id: 1234,
    });
  }

  public subscribeGetTradingBalance(): any {
    const method = 'getTradingBalance';
    this.login(method, 0);
    setTimeout(() => {
      this.ws[method].send({
        method,
        params: {},
        id: 12345,
      });
    }, timeout);
  }

  public subscribeReports(): void {
    const method = 'subscribeReports';
    this.login(method, 0);
    setTimeout(() => {
      this.ws[method].send({
        method,
        params: {},
        id: 12345,
      });
    }, timeout);
  }

  public getOrders(): any {
    const method = 'getOrders';
    this.login(method, 0);
    setTimeout(() => {
      this.ws[method].send({
        method,
        params: {},
        id: 12345,
      });
    }, timeout);
  }

  // REST
  public getSymbolDescription(symbol: string): Observable<any> {
    return this.http.get(`${backendPoint}/symbol/${symbol}`);
  }

  public getOrderbook(symbol: string): any {
    return this.http.get(`${backendPoint}/getOrderbook/${symbol}`)
      .pipe(
          map((response: any) => JSON.parse(response)),
        );
  }

  public onMessage(symbol: string): Observable<MessageEvent> {
    return this.ws[symbol].onMessage();
  }

  public closeConnection(symbol?: string, delay: number = 0): void {
    if (symbol) {
      setTimeout(() => this.ws[symbol].closeConnection(), delay);
    } else {
      Object.values(this.ws).forEach((wsConnection: WSService) => wsConnection.closeConnection());
    }
  }

  public placeNewOrder(order: INewOrder, cancelAction?: boolean): any {
    console.log(order);
    return !cancelAction ? this.http.post(`${backendPoint}/order`, order) : from([]);
  }

  // public getHistoryOrder(): any {
  //   return this.http.get(`${backendPoint}/history/order`)
  //     .pipe(
  //       map((response: any) => JSON.parse(response)),
  //       tap(response => console.log(`Backend response getHistoryOrder: \n ${response}`)),
  //     );
  // }
}
