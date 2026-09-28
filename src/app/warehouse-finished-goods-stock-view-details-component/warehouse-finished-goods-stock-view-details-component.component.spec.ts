import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseFinishedGoodsStockViewDetailsComponentComponent } from './warehouse-finished-goods-stock-view-details-component.component';

describe('WarehouseFinishedGoodsStockViewDetailsComponentComponent', () => {
  let component: WarehouseFinishedGoodsStockViewDetailsComponentComponent;
  let fixture: ComponentFixture<WarehouseFinishedGoodsStockViewDetailsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseFinishedGoodsStockViewDetailsComponentComponent]
    });
    fixture = TestBed.createComponent(WarehouseFinishedGoodsStockViewDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
