import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorEmployeesComponent } from './distributor-employees.component';

describe('DistributorEmployeesComponent', () => {
  let component: DistributorEmployeesComponent;
  let fixture: ComponentFixture<DistributorEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorEmployeesComponent]
    });
    fixture = TestBed.createComponent(DistributorEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
