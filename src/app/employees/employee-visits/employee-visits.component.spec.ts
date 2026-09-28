import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeVisitsComponent } from './employee-visits.component';

describe('EmployeeVisitsComponent', () => {
  let component: EmployeeVisitsComponent;
  let fixture: ComponentFixture<EmployeeVisitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeVisitsComponent]
    });
    fixture = TestBed.createComponent(EmployeeVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
