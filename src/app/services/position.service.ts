import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { backendPoint } from '../crypto-exchange-module/hitbtc-api.service';
import { Position, PositionStatus, PositionType } from '../models/Position';
import { Report } from '../models/Report';
import { Side } from '../models/SharedConstants';
import { TUndefinable } from '../models/nullable.type';
import { InjectableObservablesService } from './injectable-observables.service';
import { IMoneyUpdate } from './money-manager.service';

@Injectable({
	providedIn: 'root',
})

export class PositionService {
	private positionList: Position[] = [];

	constructor(
		private injectableObservables: InjectableObservablesService,
		private http: HttpClient,
	) {
		this.injectableObservables.report$
			.pipe(
				filter((reportUpdate: Report[]) => !!reportUpdate.length),
				map((reportUpdate: Report[]) => reportUpdate[0]),
				// filter((reportUpdate: Report) => reportUpdate.status === 'filled'),
			).subscribe((reportUpdate: Report) => this.handleReportUpdate(reportUpdate));
		this.http.get('./../../../backend/positions.json')
			.subscribe((positionList: any) => this.setInitPositionsValue(positionList));
	}

	public isPossibleToOpenPosition(moneyUpdate: IMoneyUpdate): boolean {
		const openedPosition: TUndefinable<Position> = this.getOpenedPositionBySymbolID(moneyUpdate.symbolID);
		return moneyUpdate.advisedResult === Side.buy && !openedPosition;
	}

	public isPossibleToClosePosition(moneyUpdate: IMoneyUpdate): boolean {
		const openedPosition: TUndefinable<Position> = this.getOpenedPositionBySymbolID(moneyUpdate.symbolID);
		return !!(moneyUpdate.advisedResult === Side.sell && openedPosition);
	}

	private getOpenedPositionBySymbolID(symbolID: string): TUndefinable<Position> {
		return this.positionList
			.find((position: Position) => position.symbolID === symbolID && position.positionStatus === PositionStatus.Opened);
	}

	private handleReportUpdate(reportUpdate: Report): void {
		console.log(reportUpdate);
		const openedPosition: TUndefinable<Position> = this.getOpenedPositionBySymbolID(reportUpdate.symbol);
		if (openedPosition && reportUpdate.side === Side.sell) {
			this.updateListWithClosedPosition(reportUpdate, openedPosition);
		} else if (!openedPosition && reportUpdate.side === Side.buy) {
			this.positionList.unshift(this.createPositionInstance(reportUpdate));
		}
		this.notifyAboutPositionChange();
	}

	private setInitPositionsValue(positionList: any): void {
		this.positionList = positionList.positions;
		this.notifyAboutPositionChange(true);
	}

	private createPositionInstance(report: Report): Position {
		return new Position({
			id: report.id,
			symbolID: report.symbol,
			positionStatus: PositionStatus.Opened,
			positionType: PositionType.LONG,
			quantity: +report.quantity,
			openPrice: report.price,
			createdAt: report.createdAt,
			updatedAt: report.updatedAt,
		});
	}

	private updateListWithClosedPosition(report: Report, openedPosition: Position): void {
		const difference: number = this.countPercentageDifference(+openedPosition.openPrice, +report.price);
		this.positionList = this.positionList.map((position: Position) => {
			if (position.id !== openedPosition.id) {
				return position;
			} else {
				return {
					...openedPosition,
					positionStatus: PositionStatus.Closed,
					closePrice: report.price,
					isProfitable: difference > 0,
					difference,
					closedAt: report.createdAt,
					updatedAt: report.updatedAt,
				};
			}
		});
	}

	private countPercentageDifference(openPrice: number, closePrice: number): number {
		return (closePrice - openPrice) * 100 / openPrice;
	}

	private notifyAboutPositionChange(isSavingLimited?: boolean): void {
		this.injectableObservables.positions$.next(this.positionList);
		if (!isSavingLimited) {
			this.http.post(`${backendPoint}/savePositions`, this.positionList)
				.subscribe((res: any) => console.log(res));
		}
	}
}
