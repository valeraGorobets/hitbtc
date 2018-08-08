import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WSService {
  private ws: WebSocket;

  constructor(url: string) {
    console.log('WebSocket is inited');
    this.ws = new WebSocket(url);
  }

  public send(message: any): void {
    this.ws.onopen = () => this.ws.send(JSON.stringify(message));
  }

  public onMessage(): Observable<MessageEvent> {
    return new Observable<MessageEvent>(observer => {
      this.ws.onmessage = (data: MessageEvent) => observer.next(data);
    });
  }

  public closeConnection(): void {
    console.log('Connection is closed');
    this.ws.close();
  }
}
