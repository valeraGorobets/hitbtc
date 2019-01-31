import { TestBed, inject } from '@angular/core/testing';

import { CandleService } from './candle.service';

describe('CandleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandleService]
    });
  });

  it('should be created', inject([CandleService], (service: CandleService) => {
    expect(service).toBeTruthy();
  }));
});
