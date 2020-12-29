import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WSService } from '../../libs/ws.service';
import { CurrencyBalance } from '../models/CurrencyBalance';
import { Symbol } from '../models/Symbol';
import { InjectableObservablesService } from '../services/injectable-observables.service';
import { AbstractCryptoService } from './abstract-crypto-service';

const socketURL: string = 'wss://api.hitbtc.com/api/2/ws';
const backendPoint: string = 'http://localhost:8080/backend';

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
			this.config = { ...configUpdate };
			this.requiredCurrencies = Object.values(this.config.symbolInfo)
				.reduce((array: string[], symbolInfo: Symbol) => [...array, symbolInfo.baseCurrency, symbolInfo.quoteCurrency], []);
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
		return this.http.get(`${backendPoint}/symbol/${symbol}`);
	}

	public getOrderbook(symbol: string): any {
		return this.http.get(`${backendPoint}/getOrderbook/${symbol}`);
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

	public getBalance(): Observable<CurrencyBalance[]> {
		return this.http.get(`${backendPoint}/trading/balance`)
			.pipe(
				map((response: any) => {
						const parsed: any = JSON.parse(response);
						if (!parsed.error) {
							return parsed.filter((currency: CurrencyBalance) =>
								!!(this.requiredCurrencies.includes(currency.currency) || +currency.available || +currency.reserved));
						} else {
							throw new Error(`Code: ${parsed.error.code}, message: ${parsed.error.message}`);
						}
					},
				),
			);
	}

	// public getBalance2(): Observable<CurrencyBalance[]> {
	//   return this.http.get('https://mercury-labs.herokuapp.com/backend/trading/balance')
	//     .pipe(
	//       map((response: any) => JSON.parse(response)
	//         .filter((currency: CurrencyBalance) =>
	//           !!(this.requiredCurrencies.includes(currency.currency) || +currency.available || +currency.reserved)),
	//       ),
	//       tap(response => console.log(`Backend response getBalance: \n ${response}`)),
	//     );
	// }
	//
	// public getHistoryOrder(): any {
	//   return this.http.get(`${backendPoint}/history/order`)
	//     .pipe(
	//       map((response: any) => JSON.parse(response)),
	//       tap(response => console.log(`Backend response getHistoryOrder: \n ${response}`)),
	//     );
	// }
}
