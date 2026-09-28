import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductionInstructionComponent } from './create-production-instruction.component';

describe('CreateProductionInstructionComponent', () => {
  let component: CreateProductionInstructionComponent;
  let fixture: ComponentFixture<CreateProductionInstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProductionInstructionComponent]
    });
    fixture = TestBed.createComponent(CreateProductionInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
