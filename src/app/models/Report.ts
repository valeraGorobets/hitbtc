import { TSide, TStatus, TType, TTimeInForce } from './Order';

export class CommonPositionFields {
  public clientOrderId: string;
  public symbol: string;
  public side: TSide;
  public status: TStatus;
  public type: TType;
  public timeInForce: TTimeInForce;
  public quantity: string;
  public price: string;
  public cumQuantity: string;
  public createdAt: string | Date;
  public updatedAt: string | Date;
  public postOnly: boolean;
}

export class Report extends CommonPositionFields {
  public id: string;
  public reportType: string;
}
