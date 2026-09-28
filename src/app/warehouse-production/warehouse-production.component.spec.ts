import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseProductionComponent } from './warehouse-production.component';

describe('WarehouseProductionComponent', () => {
  let component: WarehouseProductionComponent;
  let fixture: ComponentFixture<WarehouseProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseProductionComponent]
    });
    fixture = TestBed.createComponent(WarehouseProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
