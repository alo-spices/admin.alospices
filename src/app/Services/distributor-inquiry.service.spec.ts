import { TestBed } from '@angular/core/testing';

import { DistributorInquiryService } from './distributor-inquiry.service';

describe('DistributorInquiryService', () => {
  let service: DistributorInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributorInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
