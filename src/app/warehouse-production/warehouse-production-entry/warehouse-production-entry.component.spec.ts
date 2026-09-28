import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseProductionEntryComponent } from './warehouse-production-entry.component';

describe('WarehouseProductionEntryComponent', () => {
  let component: WarehouseProductionEntryComponent;
  let fixture: ComponentFixture<WarehouseProductionEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseProductionEntryComponent]
    });
    fixture = TestBed.createComponent(WarehouseProductionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
