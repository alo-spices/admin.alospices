import { TestBed } from '@angular/core/testing';

import { WarehouseFinishedGoodsStockService } from './warehouse-finished-goods-stock.service';

describe('WarehouseFinishedGoodsStockService', () => {
  let service: WarehouseFinishedGoodsStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseFinishedGoodsStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
