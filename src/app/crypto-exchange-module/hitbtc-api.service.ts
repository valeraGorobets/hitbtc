import { AbstractCryptoService } from './abstract-crypto-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WSService } from '../../libs/ws.service';
import { map, tap } from 'rxjs/operators';
import { IBalance } from '../services/money-manager.service';
import { InjectableObservablesService } from '../services/injectable-observables.service';
import { Symbol } from '../models/Symbol';

const socketURL = 'wss://api.hitbtc.com/api/2/ws';
const backendPoint = 'http://localhost:8080/backend';
const restEndPoint = 'https://api.hitbtc.com/api/2/public';

@Injectable({
  providedIn: 'root',
})

export class HitBTCApi implements AbstractCryptoService {
  private ws: {
    [symbol: string]: WSService,
  } = {};
  private period: string = 'M1';
  private config: any = {};
  private requiredCurrencies: any;

  constructor(
      private http: HttpClient,
      private injectableObservables: InjectableObservablesService,
    ) {
    console.log('HitBTCApi working');
    this.injectableObservables.config$.subscribe((configUpdate: any) => {
      this.config = {...configUpdate};
      this.requiredCurrencies = Object.values(this.config.symbolInfo)
        .reduce((array: string[], symbolInfo: Symbol ) => [...array, symbolInfo.baseCurrency, symbolInfo.quoteCurrency], []);
  });
  }

  public createConnection(symbol: string): void {
    console.log('create connection');
    this.ws[symbol] = new WSService(socketURL);
  }

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

  public getSymbolDescription(symbol: string): Observable<any> {
    return this.http.get(`${backendPoint}/symbol/${symbol}`)
      .pipe(
        tap(response => console.log(`Backend response getSymbolDescription: \n ${response}`)),
      );
  }

  public getOrderbook(symbol: string): any {
    return this.http.get(`${backendPoint}/getOrderbook/${symbol}`)
      .pipe(
        tap(response => console.log(`Backend response getOrderbook: \n ${response}`)),
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

  public getBalance(): Observable<IBalance[]> {
    return this.http.get(`${backendPoint}/trading/balance`)
      .pipe(
        map((response: any) => JSON.parse(response)
          .filter((currency: IBalance) =>
            !!(this.requiredCurrencies.includes(currency.currency) || +currency.available || +currency.reserved)),
        ),
        tap(response => console.log(`Backend response getBalance: \n ${response}`)),
      );
  }

  public getHistoryOrder(): any {
    return this.http.get(`${backendPoint}/history/order`)
      .pipe(
        map((response: any) => JSON.parse(response)),
        tap(response => console.log(`Backend response getHistoryOrder: \n ${response}`)),
      );
  }
}
