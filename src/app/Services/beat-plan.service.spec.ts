import { TestBed } from '@angular/core/testing';

import { BeatPlanService } from './beat-plan.service';

describe('BeatPlanService', () => {
  let service: BeatPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeatPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
