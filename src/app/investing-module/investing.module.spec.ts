import { InvestingModule } from './investing.module';

describe('InvestingModule', () => {
  let investingModule: InvestingModule;

  beforeEach(() => {
    investingModule = new InvestingModule();
  });

  it('should create an instance', () => {
    expect(investingModule).toBeTruthy();
  });
});
