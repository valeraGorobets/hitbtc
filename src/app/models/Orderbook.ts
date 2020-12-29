export interface IOrderbook {
	bid: { price: string, size: string }[];
	ask: { price: string, size: string }[];
}
