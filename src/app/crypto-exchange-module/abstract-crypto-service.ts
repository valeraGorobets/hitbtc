import { Observable } from 'rxjs';

export abstract class AbstractCryptoService {
	public abstract createConnection(symbol: string): void;
	public abstract subscribeCandles(symbol: string, period?: string): void;
	public abstract subscribeTrades(symbol: string): void;
	public abstract onMessage(symbol: string): Observable<MessageEvent>;
	public abstract closeConnection(symbol?: string, delay?: number): void;
}
