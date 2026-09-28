import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMonitoringViewDetailsComponent } from './production-monitoring-view-details.component';

describe('ProductionMonitoringViewDetailsComponent', () => {
  let component: ProductionMonitoringViewDetailsComponent;
  let fixture: ComponentFixture<ProductionMonitoringViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionMonitoringViewDetailsComponent]
    });
    fixture = TestBed.createComponent(ProductionMonitoringViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
