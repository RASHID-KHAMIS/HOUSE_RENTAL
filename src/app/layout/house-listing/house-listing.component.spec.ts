import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseListingComponent } from './house-listing.component';

describe('HouseListingComponent', () => {
  let component: HouseListingComponent;
  let fixture: ComponentFixture<HouseListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseListingComponent]
    });
    fixture = TestBed.createComponent(HouseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
