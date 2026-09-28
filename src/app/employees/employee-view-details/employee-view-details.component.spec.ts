import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewDetailsComponent } from './employee-view-details.component';

describe('EmployeeViewDetailsComponent', () => {
  let component: EmployeeViewDetailsComponent;
  let fixture: ComponentFixture<EmployeeViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeViewDetailsComponent]
    });
    fixture = TestBed.createComponent(EmployeeViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
