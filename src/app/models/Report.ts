import { TSide, TStatus, TType, TTimeInForce } from './Order';

export class Report {
  public id: string;
  public clientOrderId: string;
  public symbol: string;
  public side: TSide;
  public status: TStatus;
  public type: TType;
  public timeInForce: TTimeInForce;
  public quantity: string;
  public price: string;
  public cumQuantity: string;
  public createdAt: string;
  public updatedAt: string;
  public postOnly: boolean;
  public reportType: string;
}
