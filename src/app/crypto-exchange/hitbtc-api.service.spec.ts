import { TestBed, inject } from '@angular/core/testing';

import { HitbtcApiService } from './hitbtc-api.service';

describe('HitbtcApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HitbtcApiService],
    });
  });

  it('should be created', inject([HitbtcApiService], (service: HitbtcApiService) => {
    expect(service).toBeTruthy();
  }));
});
