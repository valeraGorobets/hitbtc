import { Injectable } from '@angular/core';
import { InjectableObservablesService } from './injectable-observables.service';
import { Position, PositionStatus, PositionType } from '../models/Position';
import { Report } from '../models/Report';
import { IMoneyUpdate } from '../services/money-manager.service';
import { Side } from '../models/SharedConstants';
import { Order } from '../models/Order';
import { HttpClient } from '@angular/common/http';
import { backendPoint } from '../crypto-exchange-module/hitbtc-api.service';


@Injectable({
  providedIn: 'root',
})

export class PositionService {
  private positionList: Position[] = [];

  constructor(
    private injectableObservables: InjectableObservablesService,
    private http: HttpClient,
  ) {
    this.injectableObservables.report$.subscribe((reportUpdate: Report[]) => this.handleReportUpdate(reportUpdate));
    this.http.get('./../../../backend/positions.json')
      .subscribe(positionList => this.setInitPositionsValue(positionList));
  }

  public isPossibleToOpenPosition(moneyUpdate: IMoneyUpdate): boolean {
    const openedPosition = this.getOpendPositionBySymbolID(moneyUpdate.symbolID);
    if (moneyUpdate.advisedResult === Side.buy && !openedPosition) {
      return true;
    } else {
      return false;
    }
  }

  public isPossibleToClosePosition(moneyUpdate: IMoneyUpdate): boolean {
    const openedPosition = this.getOpendPositionBySymbolID(moneyUpdate.symbolID);
    if (moneyUpdate.advisedResult === Side.sell && openedPosition) {
      return true;
    } else {
      return false;
    }
  }

  public updatePositionList(moneyUpdate: IMoneyUpdate, order: Order): void {
    if (moneyUpdate.advisedResult === Side.buy) {
      this.positionList.push(this.createPositionInstance(moneyUpdate, order));
    } else if (moneyUpdate.advisedResult === Side.sell) {
      this.updateListWithClosedPosition(moneyUpdate, order);
    }
    this.notifyAboutPositionChange();
  }

  private setInitPositionsValue(positionList: any): void {
    this.positionList = positionList.positions;
    this.notifyAboutPositionChange(true);
  }

  private handleReportUpdate(reportUpdate: Report[]): void {
    console.log(reportUpdate);
  }

  private getOpendPositionBySymbolID(symbolID: string): Position | undefined {
    return this.positionList
      .find((position: Position) => position.symbolID === symbolID && position.positionStatus === PositionStatus.Opened);
  }

  private createPositionInstance(moneyUpdate: IMoneyUpdate, order: Order): Position {
    return new Position({
      id: order.id,
      symbolID: moneyUpdate.symbolID,
      positionStatus: PositionStatus.Opened,
      positionType: PositionType.LONG,
      quantity: moneyUpdate.amount,
      openPrice: order.price,
      createdAt: order.createdAt,
    });
  }

  private updateListWithClosedPosition(moneyUpdate: IMoneyUpdate, order: Order): void {
    let openedPosition = this.getOpendPositionBySymbolID(moneyUpdate.symbolID);
    const difference = this.countPercentageDifference(+openedPosition.openPrice, +order.price);
    this.positionList = this.positionList.map((position: Position) => {
      if (position.id !== openedPosition.id) {
        return position;
      } else {
        return {
          ...openedPosition,
          positionStatus: PositionStatus.Closed,
          closePrice: order.price,
          isProfitable: difference > 0,
          difference,
          closedAt: order.createdAt,
        }
      }
    });
  }

  private countPercentageDifference(openPrice: number, closePrice: number): number {
    return 100 * (closePrice - openPrice) / openPrice;
  }

  private notifyAboutPositionChange(isSavingLimited?: boolean): void {
    this.injectableObservables.positions$.next(this.positionList);
    if (!isSavingLimited) {
      this.http.post(`${backendPoint}/savePositions`, this.positionList)
      .subscribe(res => console.log(res));
    }
  }
}
