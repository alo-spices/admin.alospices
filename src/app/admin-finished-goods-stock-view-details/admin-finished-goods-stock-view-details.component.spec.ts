import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinishedGoodsStockViewDetailsComponent } from './admin-finished-goods-stock-view-details.component';

describe('AdminFinishedGoodsStockViewDetailsComponent', () => {
  let component: AdminFinishedGoodsStockViewDetailsComponent;
  let fixture: ComponentFixture<AdminFinishedGoodsStockViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFinishedGoodsStockViewDetailsComponent]
    });
    fixture = TestBed.createComponent(AdminFinishedGoodsStockViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
