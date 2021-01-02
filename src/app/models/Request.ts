enum Method {
	cancelOrder = 'cancelOrder',
	cancelReplaceOrder = 'cancelReplaceOrder',
	getCurrency = 'getCurrency',
	getOrders = 'getOrders',
	getSymbol = 'getSymbol',
	getTrades = 'getTrades',
	getTradingBalance = 'getTradingBalance',
	login = 'login',
	newOrder = 'newOrder',
	subscribeCandles = 'subscribeCandles',
	subscribeOrderbook = 'subscribeOrderbook',
	subscribeReports = 'subscribeReports',
	subscribeTicker = 'subscribeTicker',
	subscribeTrades = 'subscribeTrades',
}

export class Request {
	private method: Method;
	private params: any;
	private id: number;
}
