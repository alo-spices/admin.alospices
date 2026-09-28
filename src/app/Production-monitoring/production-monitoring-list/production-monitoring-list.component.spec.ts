import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMonitoringListComponent } from './production-monitoring-list.component';

describe('ProductionMonitoringListComponent', () => {
  let component: ProductionMonitoringListComponent;
  let fixture: ComponentFixture<ProductionMonitoringListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionMonitoringListComponent]
    });
    fixture = TestBed.createComponent(ProductionMonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
