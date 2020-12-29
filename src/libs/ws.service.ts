import { Observable, Subscriber } from 'rxjs';

export class WSService {
	private ws: WebSocket;

	constructor(url: string) {
		console.log('WebSocket is inited');
		this.ws = new WebSocket(url);
		this.ws.onclose = (event: any) => {
			console.log('WebSocket is closed now.');
			console.log(event);
			console.log('WebSocket is inited');
			this.ws = new WebSocket(url);
		};
		this.ws.onerror = (event: any): void => {
			console.error('WebSocket error observed:', event);
		};
	}

	public send(message: any): void {
		this.ws.onopen = () => this.ws.send(JSON.stringify(message));
	}

	public onMessage(): Observable<MessageEvent> {
		return new Observable<MessageEvent>((observer: Subscriber<MessageEvent>) => {
			this.ws.onmessage = (data: MessageEvent) => observer.next(JSON.parse(data.data));
		});
	}

	public closeConnection(): void {
		console.log('Connection is closed');
		this.ws.close();
	}
}
