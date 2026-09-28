import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinishedGoodsStockComponent } from './admin-finished-goods-stock.component';

describe('AdminFinishedGoodsStockComponent', () => {
  let component: AdminFinishedGoodsStockComponent;
  let fixture: ComponentFixture<AdminFinishedGoodsStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFinishedGoodsStockComponent]
    });
    fixture = TestBed.createComponent(AdminFinishedGoodsStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
