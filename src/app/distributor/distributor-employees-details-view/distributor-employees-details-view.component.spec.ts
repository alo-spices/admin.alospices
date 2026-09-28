import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorEmployeesDetailsViewComponent } from './distributor-employees-details-view.component';

describe('DistributorEmployeesDetailsViewComponent', () => {
  let component: DistributorEmployeesDetailsViewComponent;
  let fixture: ComponentFixture<DistributorEmployeesDetailsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorEmployeesDetailsViewComponent]
    });
    fixture = TestBed.createComponent(DistributorEmployeesDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
