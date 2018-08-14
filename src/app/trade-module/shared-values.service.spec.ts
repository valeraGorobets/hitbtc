import { TestBed, inject } from '@angular/core/testing';

import { SharedValuesService } from './shared-values.service';

describe('SharedValuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedValuesService]
    });
  });

  it('should be created', inject([SharedValuesService], (service: SharedValuesService) => {
    expect(service).toBeTruthy();
  }));
});
