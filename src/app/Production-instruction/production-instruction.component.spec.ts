import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionInstructionComponent } from './production-instruction.component';

describe('ProductionInstructionComponent', () => {
  let component: ProductionInstructionComponent;
  let fixture: ComponentFixture<ProductionInstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionInstructionComponent]
    });
    fixture = TestBed.createComponent(ProductionInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
