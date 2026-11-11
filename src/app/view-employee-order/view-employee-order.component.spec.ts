import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeOrderComponent } from './view-employee-order.component';

describe('ViewEmployeeOrderComponent', () => {
  let component: ViewEmployeeOrderComponent;
  let fixture: ComponentFixture<ViewEmployeeOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEmployeeOrderComponent]
    });
    fixture = TestBed.createComponent(ViewEmployeeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
