import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CurrencyBalance } from '../models/CurrencyBalance';
import { ISavedCandles } from './candle.service';
import { IndicatorPlotModel } from './indicator.service';
import { IActionUpdate } from './money-manager.service';

@Injectable()
export class InjectableObservablesService {
	public config$: ReplaySubject<any> = new ReplaySubject();
	public candles$: ReplaySubject<ISavedCandles> = new ReplaySubject();
	public indicator$: ReplaySubject<IndicatorPlotModel> = new ReplaySubject();
	public positions$: ReplaySubject<any> = new ReplaySubject();
	public balance$: ReplaySubject<CurrencyBalance[]> = new ReplaySubject();
	public positionAction$: ReplaySubject<any> = new ReplaySubject();
	public strategyAction$: ReplaySubject<IActionUpdate> = new ReplaySubject();
	public moneyAction$: ReplaySubject<any> = new ReplaySubject();
}
