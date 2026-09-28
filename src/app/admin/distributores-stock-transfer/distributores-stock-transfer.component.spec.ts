import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributoresStockTransferComponent } from './distributores-stock-transfer.component';

describe('DistributoresStockTransferComponent', () => {
  let component: DistributoresStockTransferComponent;
  let fixture: ComponentFixture<DistributoresStockTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributoresStockTransferComponent]
    });
    fixture = TestBed.createComponent(DistributoresStockTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
