import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookingComponent } from './all-booking.component';

describe('AllBookingComponent', () => {
  let component: AllBookingComponent;
  let fixture: ComponentFixture<AllBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBookingComponent]
    });
    fixture = TestBed.createComponent(AllBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
