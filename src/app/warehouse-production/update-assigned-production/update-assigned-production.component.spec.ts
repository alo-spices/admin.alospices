import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssignedProductionComponent } from './update-assigned-production.component';

describe('UpdateAssignedProductionComponent', () => {
  let component: UpdateAssignedProductionComponent;
  let fixture: ComponentFixture<UpdateAssignedProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAssignedProductionComponent]
    });
    fixture = TestBed.createComponent(UpdateAssignedProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
