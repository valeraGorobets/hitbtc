export interface IOrderbookTick {
  price: string;
  size: string;
}

export interface IOrderbook {
  bid: IOrderbookTick[];
  ask: IOrderbookTick[];
}
