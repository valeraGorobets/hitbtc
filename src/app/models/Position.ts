import { Order } from './Order';

export enum PositionStatus {
  Opened = 'OPENED',
  Closed = 'CLOSED',
}

enum PositionType {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export class Position {
  public id: number;
  public symbolID: string;
  public positionStatus: PositionStatus;
  public positionType: PositionType;
  
  public quantity: string;
  public openPrice: string;
  public closePrice: string;
  public isProfitable: boolean;
  public difference: number;

  public createdAt: string | Date;
  public updatedAt: string | Date;
  public closedAt: string | Date;
}
