import { TestBed, inject } from '@angular/core/testing';

import { InvestingService } from './investing.service';

describe('InvestingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestingService],
    });
  });

  it('should be created', inject([InvestingService], (service: InvestingService) => {
    expect(service).toBeTruthy();
  }));
});
