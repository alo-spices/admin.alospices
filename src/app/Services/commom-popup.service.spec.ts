import { TestBed } from '@angular/core/testing';

import { CommomPopupService } from './commom-popup.service';

describe('CommomPopupService', () => {
  let service: CommomPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommomPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
