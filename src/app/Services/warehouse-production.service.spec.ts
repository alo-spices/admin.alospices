import { TestBed } from '@angular/core/testing';

import { WarehouseProductionService } from './warehouse-production.service';

describe('WarehouseProductionService', () => {
  let service: WarehouseProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
