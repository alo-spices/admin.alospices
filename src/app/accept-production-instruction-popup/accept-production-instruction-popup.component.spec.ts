import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptProductionInstructionPopupComponent } from './accept-production-instruction-popup.component';

describe('AcceptProductionInstructionPopupComponent', () => {
  let component: AcceptProductionInstructionPopupComponent;
  let fixture: ComponentFixture<AcceptProductionInstructionPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptProductionInstructionPopupComponent]
    });
    fixture = TestBed.createComponent(AcceptProductionInstructionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
