import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCompleteProductionViewDataComponent } from './warehouse-complete-production-view-data.component';

describe('WarehouseCompleteProductionViewDataComponent', () => {
  let component: WarehouseCompleteProductionViewDataComponent;
  let fixture: ComponentFixture<WarehouseCompleteProductionViewDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseCompleteProductionViewDataComponent]
    });
    fixture = TestBed.createComponent(WarehouseCompleteProductionViewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
