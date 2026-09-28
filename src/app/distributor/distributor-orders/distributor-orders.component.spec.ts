import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorOrdersComponent } from './distributor-orders.component';

describe('DistributorOrdersComponent', () => {
  let component: DistributorOrdersComponent;
  let fixture: ComponentFixture<DistributorOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorOrdersComponent]
    });
    fixture = TestBed.createComponent(DistributorOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
