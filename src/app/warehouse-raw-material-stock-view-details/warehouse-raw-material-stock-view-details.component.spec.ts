import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRawMaterialStockViewDetailsComponent } from './warehouse-raw-material-stock-view-details.component';

describe('WarehouseRawMaterialStockViewDetailsComponent', () => {
  let component: WarehouseRawMaterialStockViewDetailsComponent;
  let fixture: ComponentFixture<WarehouseRawMaterialStockViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseRawMaterialStockViewDetailsComponent]
    });
    fixture = TestBed.createComponent(WarehouseRawMaterialStockViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
