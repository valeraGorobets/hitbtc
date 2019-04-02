import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Position } from '../../models/Position';
import { InjectableObservablesService } from '../../services/injectable-observables.service';

@Component({
  selector: 'position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['../../../assets/common-table-styles.less', './position-table.component.less'],
})

export class PositionTableComponent implements OnInit {
  public dataColumns: string[] = ['symbolID', 'positionStatus', 'positionType', 'difference', 'isProfitable'];
  public displayedColumns: string[] = ['updatedAt', ...this.dataColumns];
  public dataSource = new MatTableDataSource<Position>([]);
  public isDataLoading = true;

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  public justUpdated: boolean = false;

  constructor(
    private injectableObservables: InjectableObservablesService,
  ) {
    this.injectableObservables.positions$.subscribe((positionsUpdate: Position[]) => this.handlePositionsUpdate(positionsUpdate));
  }

  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private handlePositionsUpdate(positionsUpdate: Position[]): void {
    if (this.isDataLoading) {
      this.isDataLoading = false;
    }
    this.justUpdated = true;
    this.dataSource = new MatTableDataSource<Position>(positionsUpdate);
    setTimeout(() => this.justUpdated = false, 5000);
  }
}
