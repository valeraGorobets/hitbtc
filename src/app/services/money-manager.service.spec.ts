import { TestBed, inject } from '@angular/core/testing';

import { MoneyManagerService } from './money-manager.service';

describe('MoneyManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoneyManagerService]
    });
  });

  it('should be created', inject([MoneyManagerService], (service: MoneyManagerService) => {
    expect(service).toBeTruthy();
  }));
});
