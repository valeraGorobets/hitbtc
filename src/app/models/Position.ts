export enum PositionStatus {
  Opened = 'OPENED',
  Closed = 'CLOSED',
  Triggered = 'TRIGGERED',
}

export enum PositionType {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export interface IPositionConfig {
  id: number | string;
  symbolID: string;
  positionStatus: PositionStatus;
  positionType: PositionType;

  quantity: number;
  openPrice: string;
  closePrice?: string;
  isProfitable?: boolean;
  difference?: number;

  createdAt: string | Date;
  updatedAt?: string | Date;
  closedAt?: string | Date;
}

export class Position {
  public id: number | string;
  public symbolID: string;
  public positionStatus: PositionStatus;
  public positionType: PositionType;

  public quantity: number;
  public openPrice: string;
  public closePrice: string;
  public isProfitable: boolean;
  public difference: number;

  public createdAt: string | Date;
  public updatedAt: string | Date;
  public closedAt: string | Date;

  constructor(config: IPositionConfig) {
    this.id = config.id;
    this.symbolID = config.symbolID;
    this.positionStatus = config.positionStatus;
    this.positionType = config.positionType;

    this.quantity = config.quantity;
    this.openPrice = config.openPrice;
    this.closePrice = config.closePrice;
    this.isProfitable = config.isProfitable;
    this.difference = config.difference;

    this.createdAt = config.createdAt;
    this.updatedAt = config.updatedAt;
    this.closedAt = config.closedAt;
  }
}
