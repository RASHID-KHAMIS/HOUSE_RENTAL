import { TestBed } from '@angular/core/testing';

import { HouseLocationService } from './house-location.service';

describe('HouseLocationService', () => {
  let service: HouseLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
