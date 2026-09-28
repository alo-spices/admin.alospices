import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseStockViewComponent } from './warehouse-stock-view.component';

describe('WarehouseStockViewComponent', () => {
  let component: WarehouseStockViewComponent;
  let fixture: ComponentFixture<WarehouseStockViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseStockViewComponent]
    });
    fixture = TestBed.createComponent(WarehouseStockViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
