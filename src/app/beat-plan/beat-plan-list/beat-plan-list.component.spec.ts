import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatPlanListComponent } from './beat-plan-list.component';

describe('BeatPlanListComponent', () => {
  let component: BeatPlanListComponent;
  let fixture: ComponentFixture<BeatPlanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeatPlanListComponent]
    });
    fixture = TestBed.createComponent(BeatPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
