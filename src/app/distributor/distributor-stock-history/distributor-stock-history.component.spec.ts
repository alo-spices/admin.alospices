import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorStockHistoryComponent } from './distributor-stock-history.component';

describe('DistributorStockHistoryComponent', () => {
  let component: DistributorStockHistoryComponent;
  let fixture: ComponentFixture<DistributorStockHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorStockHistoryComponent]
    });
    fixture = TestBed.createComponent(DistributorStockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
