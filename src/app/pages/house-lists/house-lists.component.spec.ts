import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseListsComponent } from './house-lists.component';

describe('HouseListsComponent', () => {
  let component: HouseListsComponent;
  let fixture: ComponentFixture<HouseListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseListsComponent]
    });
    fixture = TestBed.createComponent(HouseListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
