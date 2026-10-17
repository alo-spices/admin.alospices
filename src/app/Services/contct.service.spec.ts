import { TestBed } from '@angular/core/testing';

import { ContctService } from './contct.service';

describe('ContctService', () => {
  let service: ContctService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContctService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
