import { Injectable } from '@angular/core';
import { InjectableObservablesService } from './injectable-observables.service';
import { Position, PositionStatus, PositionType } from '../models/Position';
import { Report } from '../models/Report';
import { IMoneyUpdate } from '../services/money-manager.service';
import { Side } from '../models/SharedConstants';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})

export class PositionService {
  private positionList: Position[] = [];

  constructor(
    private injectableObservables: InjectableObservablesService,
  ) {
    this.injectableObservables.report$.subscribe((reportUpdate: Report[]) => this.handleReportUpdate(reportUpdate));
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
    this.injectableObservables.positions$.next(this.positionList);
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
    const difference = +openedPosition.openPrice - +order.price;
    openedPosition = {
      ...openedPosition,
      positionStatus: PositionStatus.Closed,
      closePrice: order.price,
      isProfitable: difference > 0,
      difference,
      closedAt: order.createdAt,
    }
  }
}
