import { Observable } from 'rxjs';

export abstract class AbstractCryptoService {
  public abstract createConnection(url?: string): void;
  public abstract subscribeCandles(symbol?: string, period?: string): void;
  public abstract subscribeTrades(symbol?: string): void;
  public abstract onMessage(): Observable<MessageEvent>;
  public abstract closeConnection(delay?: number): void;
}