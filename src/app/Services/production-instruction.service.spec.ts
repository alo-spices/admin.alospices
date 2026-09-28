import { TestBed } from '@angular/core/testing';

import { ProductionInstructionService } from './production-instruction.service';

describe('ProductionInstructionService', () => {
  let service: ProductionInstructionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionInstructionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
