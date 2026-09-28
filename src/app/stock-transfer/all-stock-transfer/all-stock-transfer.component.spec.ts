import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStockTransferComponent } from './all-stock-transfer.component';

describe('AllStockTransferComponent', () => {
  let component: AllStockTransferComponent;
  let fixture: ComponentFixture<AllStockTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllStockTransferComponent]
    });
    fixture = TestBed.createComponent(AllStockTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
