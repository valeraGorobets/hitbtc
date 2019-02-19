import { CommonPositionFields } from './Report';

export type TSide = 'sell' | 'buy';
export type TType = 'limit' | 'market' | 'stopLimit' | 'stopMarket';
export type TTimeInForce = 'GTC' | 'IOC' | 'FOK' | 'Day' | 'GTD';
export type TStatus = 'new' | 'suspended' | 'partiallyFilled' | 'filled' | 'canceled' | 'expired';

export class Order extends CommonPositionFields {
  public id: number;
  public stopPrice:	string;
  public expireTime: string;
}

export interface INewOrder {
  symbol: string;
  quantity: string;
  price: string;
  side: TSide;
  type?: TType;
  stopPrice?: string;
  timeInForce?: TTimeInForce;
  strictValidate?: boolean;
  postOnly?: boolean;
}

/* Time in Force
is a special instruction used when placing a trade to indicate how long an order will remain active before it is executed or expired.
GTC - ''Good-Till-Cancelled'' order won't be closed until it is filled.
IOC - ''Immediate-Or-Cancel'' order must be executed immediately.
        Any part of an IOC order that cannot be filled immediately will be cancelled.
FOK - ''Fill-Or-Kill'' is a type of ''Time in Force'' designation used in securities trading that instructs a brokerage
        to execute a transaction immediately and completely or not execute it at all.
Day - keeps the order active until the end of the trading day (UTC).
GTD - ''Good-Till-Date''. The date is specified in expireTime.
 */
