import { TestBed } from '@angular/core/testing';

import { WarehouseRawMaterislStockService } from './warehouse-raw-materisl-stock.service';

describe('WarehouseRawMaterislStockService', () => {
  let service: WarehouseRawMaterislStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseRawMaterislStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
