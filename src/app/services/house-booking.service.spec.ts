import { TestBed } from '@angular/core/testing';

import { HouseBookingService } from './house-booking.service';

describe('HouseBookingService', () => {
  let service: HouseBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
