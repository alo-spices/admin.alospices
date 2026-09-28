import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRawMaterialStockComponent } from './warehouse-raw-material-stock.component';

describe('WarehouseRawMaterialStockComponent', () => {
  let component: WarehouseRawMaterialStockComponent;
  let fixture: ComponentFixture<WarehouseRawMaterialStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseRawMaterialStockComponent]
    });
    fixture = TestBed.createComponent(WarehouseRawMaterialStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
