import { TestBed } from '@angular/core/testing';

import { PriceInformationService } from './price-information.service';

describe('PriceInformationService', () => {
  let service: PriceInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
