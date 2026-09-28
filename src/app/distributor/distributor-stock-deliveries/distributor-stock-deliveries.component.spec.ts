import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorStockDeliveriesComponent } from './distributor-stock-deliveries.component';

describe('DistributorStockDeliveriesComponent', () => {
  let component: DistributorStockDeliveriesComponent;
  let fixture: ComponentFixture<DistributorStockDeliveriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorStockDeliveriesComponent]
    });
    fixture = TestBed.createComponent(DistributorStockDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
