import { Injectable } from '@angular/core';
import { InjectableObservablesService } from './injectable-observables.service';
import { Position, PositionStatus } from '../models/Position';
import { Report } from '../models/Report';
import { IMoneyUpdate } from '../services/money-manager.service';
import { Side } from '../models/SharedConstants';

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

  private handleReportUpdate(reportUpdate: Report[]): void {
    console.log(reportUpdate);
  }

  public isPossibleToOpenNewOrder(moneyUpdate: IMoneyUpdate): boolean {
    const openedPosition = this.positionList
        .find((position: Position) => position.symbolID === moneyUpdate.symbolID && position.positionStatus === PositionStatus.Opened);
    if (moneyUpdate.advisedResult === Side.buy && openedPosition ||
      moneyUpdate.advisedResult === Side.sell && !openedPosition) {
        return false;
    }
    return true;
  }
}
