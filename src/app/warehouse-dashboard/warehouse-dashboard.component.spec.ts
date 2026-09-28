import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDashboardComponent } from './warehouse-dashboard.component';

describe('WarehouseDashboardComponent', () => {
  let component: WarehouseDashboardComponent;
  let fixture: ComponentFixture<WarehouseDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseDashboardComponent]
    });
    fixture = TestBed.createComponent(WarehouseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
