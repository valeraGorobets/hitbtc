import { Observable, Subscriber } from 'rxjs';

export class WSService {
	private ws: WebSocket;

	constructor(url: string) {
		console.log('WebSocket is inited');
		this.ws = new WebSocket(url);
		this.ws.onclose = (event: any): void => {
			console.log('WebSocket is closed now.');
			console.log(event);
		};
		this.ws.onerror = (event: any): void => {
			console.error('WebSocket error observed:', event);
		};
	}

	public send(message: any): void {
		if (this.ws.readyState === this.ws.OPEN) {
			this.ws.send(JSON.stringify(message));
		} else {
			this.ws.onopen = (): void => this.ws.send(JSON.stringify(message));
		}
	}

	public onMessage(): Observable<MessageEvent> {
		return new Observable<MessageEvent>((observer: Subscriber<MessageEvent>): void => {
			this.ws.onmessage = (data: MessageEvent): void => observer.next(JSON.parse(data.data));
		});
	}

	public closeConnection(): void {
		console.log('Connection is closed');
		this.ws.close();
	}
}
