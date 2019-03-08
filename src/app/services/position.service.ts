import { Injectable } from '@angular/core';
import { InjectableObservablesService } from './injectable-observables.service';
import { Report } from '../models/Report';
import { Position, PositionStatus } from '../models/Position';

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
    reportUpdate.forEach((report: Report) => {
      const positionById = this.positionList.find((position: Position) => position.id === report.id);
    });
  }

}
