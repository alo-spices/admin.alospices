import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferStockHistroyComponent } from './transfer-stock-histroy.component';

describe('TransferStockHistroyComponent', () => {
  let component: TransferStockHistroyComponent;
  let fixture: ComponentFixture<TransferStockHistroyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferStockHistroyComponent]
    });
    fixture = TestBed.createComponent(TransferStockHistroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
