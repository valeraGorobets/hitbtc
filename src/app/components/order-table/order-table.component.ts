import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Report } from '../../models/Report';
import { InjectableObservablesService } from '../../services/injectable-observables.service';

@Component({
	selector: 'order-table',
	templateUrl: './order-table.component.html',
	styleUrls: ['../../../assets/common-table-styles.less', './order-table.component.less'],
})

export class OrderTableComponent implements OnInit {
	public dataColumns: string[] = ['symbol', 'id', 'price', 'quantity', 'side', 'status'];
	public displayedColumns: string[] = ['updatedAt', ...this.dataColumns];
	public dataSource: MatTableDataSource<Report> = new MatTableDataSource<Report>([]);
	public isDataLoading: boolean = true;

	@ViewChild(MatPaginator) public paginator: MatPaginator;
	public justUpdated: boolean = false;

	constructor(
		private injectableObservables: InjectableObservablesService,
	) {
		this.injectableObservables.report$.subscribe((reportUpdate: Report[]) => this.handleReportUpdate(reportUpdate));
	}

	public ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	private handleReportUpdate(reportUpdate: Report[]): void {
		if (this.isDataLoading) {
			this.isDataLoading = false;
		}
		this.justUpdated = true;
		this.dataSource = new MatTableDataSource<Report>(reportUpdate);
		setTimeout(() => this.justUpdated = false, 5000);
	}
}

//   {
//     "id": "103984929241",
//     "clientOrderId": "d12108e56236f75287518e1c395d5d4e",
//     "symbol": "ETHUSD",
//     "side": "buy",
//     "status": "canceled",
//     "type": "limit",
//     "timeInForce": "GTC",
//     "quantity": "0.0001",
//     "price": "1.000",
//     "cumQuantity": "0.0000",
//     "createdAt": "2019-02-19T06:22:02.102Z",
//     "updatedAt": "2019-02-19T06:30:29.004Z",
//     "postOnly": false,
//     "reportType": "canceled",
//   },
