import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorIncomingStockComponent } from './distributor-incoming-stock.component';

describe('DistributorIncomingStockComponent', () => {
  let component: DistributorIncomingStockComponent;
  let fixture: ComponentFixture<DistributorIncomingStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorIncomingStockComponent]
    });
    fixture = TestBed.createComponent(DistributorIncomingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
