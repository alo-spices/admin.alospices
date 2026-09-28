import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorDeliveriesViewDetailsComponent } from './distributor-deliveries-view-details.component';

describe('DistributorDeliveriesViewDetailsComponent', () => {
  let component: DistributorDeliveriesViewDetailsComponent;
  let fixture: ComponentFixture<DistributorDeliveriesViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorDeliveriesViewDetailsComponent]
    });
    fixture = TestBed.createComponent(DistributorDeliveriesViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
