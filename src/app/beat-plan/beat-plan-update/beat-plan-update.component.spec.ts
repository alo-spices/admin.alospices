import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatPlanUpdateComponent } from './beat-plan-update.component';

describe('BeatPlanUpdateComponent', () => {
  let component: BeatPlanUpdateComponent;
  let fixture: ComponentFixture<BeatPlanUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeatPlanUpdateComponent]
    });
    fixture = TestBed.createComponent(BeatPlanUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
