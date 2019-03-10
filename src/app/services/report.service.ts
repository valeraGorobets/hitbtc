import { Injectable } from '@angular/core';
import { InjectableObservablesService } from './injectable-observables.service';
import { HitBTCApi } from '../crypto-exchange-module/hitbtc-api.service';
import { filter } from 'rxjs/operators';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})

export class ReportService {
  private reportList: Order[] = [];

  constructor(
    private injectableObservables: InjectableObservablesService,
    private hitBTCApiService: HitBTCApi,
  ) {
    setTimeout(() => this.subscribeReports(), 6000);
  }

  private subscribeReports(): void {
    this.hitBTCApiService.subscribeReports();
    this.hitBTCApiService.onMessage('subscribeReports')
    .pipe(
      filter((reportResponse: any) => {
        return !!reportResponse.params;
      }),
    ).subscribe((reportResponse: any) => {
      if (reportResponse.method === 'activeOrders') {
         this.setReportList(reportResponse.params);
      } else {
        this.updateReportList(reportResponse.params);
      }
    });
  }

  public setReportList(report: Order[]): void {
    this.reportList = [ ...report.map(this.transformStringsToDate), ...this.reportList];
    this.notifyAboutReportListUpdate();
  }

  public updateReportList(report: Order): void {
    this.reportList = [this.transformStringsToDate(report), ...this.reportList];
    this.reportList = this.getUniqueObjects(this.reportList);
    this.notifyAboutReportListUpdate();
  }

  public notifyAboutReportListUpdate(): void {
    console.log('subscribeReports');
    console.log(this.reportList);
    this.injectableObservables.report$.next(this.reportList);
  }

  private transformStringsToDate(order: Order): Order {
    return {
      ...order,
      createdAt: new Date(order.createdAt as string),
      updatedAt: new Date(order.updatedAt as string),
    };
  }

  private getUniqueObjects(array: Order[]): Order[] {
    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item.id)) {
        map.set(item.id, true);
        result.push(item);
      }
    }
    return result;
  }
}
