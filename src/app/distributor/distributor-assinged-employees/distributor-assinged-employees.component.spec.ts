import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorAssingedEmployeesComponent } from './distributor-assinged-employees.component';

describe('DistributorAssingedEmployeesComponent', () => {
  let component: DistributorAssingedEmployeesComponent;
  let fixture: ComponentFixture<DistributorAssingedEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorAssingedEmployeesComponent]
    });
    fixture = TestBed.createComponent(DistributorAssingedEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
