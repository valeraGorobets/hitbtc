import { CryptoExchangeModule } from './crypto-exchange.module';

describe('CryptoExchangeModule', () => {
  let cryptoExchangeModule: CryptoExchangeModule;

  beforeEach(() => {
    cryptoExchangeModule = new CryptoExchangeModule();
  });

  it('should create an instance', () => {
    expect(cryptoExchangeModule).toBeTruthy();
  });
});
