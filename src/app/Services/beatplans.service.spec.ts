import { TestBed } from '@angular/core/testing';

import { BeatplansService } from './beatplans.service';

describe('BeatplansService', () => {
  let service: BeatplansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeatplansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
