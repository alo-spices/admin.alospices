import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferStatusPopupComponent } from './stock-transfer-status-popup.component';

describe('StockTransferStatusPopupComponent', () => {
  let component: StockTransferStatusPopupComponent;
  let fixture: ComponentFixture<StockTransferStatusPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockTransferStatusPopupComponent]
    });
    fixture = TestBed.createComponent(StockTransferStatusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
