import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorViewOrdersComponent } from './distributor-view-orders.component';

describe('DistributorViewOrdersComponent', () => {
  let component: DistributorViewOrdersComponent;
  let fixture: ComponentFixture<DistributorViewOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorViewOrdersComponent]
    });
    fixture = TestBed.createComponent(DistributorViewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
