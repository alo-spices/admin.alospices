import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductionInstructionsComponent } from './update-production-instructions.component';

describe('UpdateProductionInstructionsComponent', () => {
  let component: UpdateProductionInstructionsComponent;
  let fixture: ComponentFixture<UpdateProductionInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductionInstructionsComponent]
    });
    fixture = TestBed.createComponent(UpdateProductionInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
