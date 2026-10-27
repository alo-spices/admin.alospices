import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCompleteProductionListComponent } from './warehouse-complete-production-list.component';

describe('WarehouseCompleteProductionListComponent', () => {
  let component: WarehouseCompleteProductionListComponent;
  let fixture: ComponentFixture<WarehouseCompleteProductionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseCompleteProductionListComponent]
    });
    fixture = TestBed.createComponent(WarehouseCompleteProductionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
