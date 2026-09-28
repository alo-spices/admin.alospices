import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatPlanAddComponent } from './beat-plan-add.component';

describe('BeatPlanAddComponent', () => {
  let component: BeatPlanAddComponent;
  let fixture: ComponentFixture<BeatPlanAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeatPlanAddComponent]
    });
    fixture = TestBed.createComponent(BeatPlanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
