import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingStockTransferViewComponent } from './incoming-stock-transfer-view.component';

describe('IncomingStockTransferViewComponent', () => {
  let component: IncomingStockTransferViewComponent;
  let fixture: ComponentFixture<IncomingStockTransferViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomingStockTransferViewComponent]
    });
    fixture = TestBed.createComponent(IncomingStockTransferViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
