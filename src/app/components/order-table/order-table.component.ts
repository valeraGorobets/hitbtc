import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ELEMENT_DATA } from './order-table.config';
import { IPeriodicElement } from './order-table.model';

@Component({
	selector: 'app-order-table',
	templateUrl: './order-table.component.html',
	styleUrls: ['./order-table.component.less'],
})
export class OrderTableComponent implements OnInit {
	public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	public dataSource: MatTableDataSource<IPeriodicElement> = new MatTableDataSource<IPeriodicElement>(ELEMENT_DATA);

	@ViewChild(MatPaginator) public paginator: MatPaginator;

	public ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
	}
}
