import { Order } from './Order';

export enum PositionStatus {
  Opened = 'OPENED',
  Closed = 'CLOSED',
}
export class Position extends Order {
  public positionStatus: PositionStatus;
  public closedAt: string;
  public isProfitable: boolean;
  public difference: number;
}
