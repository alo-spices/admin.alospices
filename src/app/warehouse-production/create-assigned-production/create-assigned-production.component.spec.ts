import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignedProductionComponent } from './create-assigned-production.component';

describe('CreateAssignedProductionComponent', () => {
  let component: CreateAssignedProductionComponent;
  let fixture: ComponentFixture<CreateAssignedProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAssignedProductionComponent]
    });
    fixture = TestBed.createComponent(CreateAssignedProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
