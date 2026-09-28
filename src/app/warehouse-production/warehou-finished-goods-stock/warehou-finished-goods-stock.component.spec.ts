import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouFinishedGoodsStockComponent } from './warehou-finished-goods-stock.component';

describe('WarehouFinishedGoodsStockComponent', () => {
  let component: WarehouFinishedGoodsStockComponent;
  let fixture: ComponentFixture<WarehouFinishedGoodsStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouFinishedGoodsStockComponent]
    });
    fixture = TestBed.createComponent(WarehouFinishedGoodsStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
