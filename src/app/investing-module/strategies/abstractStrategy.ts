import { Candle } from '../../models/Candle';
import { Side } from '../../models/SharedConstants';

export enum AvailableStrategies {
	ThreeMAStrategy = 'ThreeMAStrategy',
}

export abstract class Strategy {
	public abstract advisedInvestingSide(candles: Candle[], isPartOfStrategy?: boolean): Side;

	// public abstract notifyAboutNewIndicatorValues(params: any): void;
}
