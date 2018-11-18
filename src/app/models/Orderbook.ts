export interface Orderbook {
  bid: { price: string, size: string }[],
  ask: { price: string, size: string }[],
}