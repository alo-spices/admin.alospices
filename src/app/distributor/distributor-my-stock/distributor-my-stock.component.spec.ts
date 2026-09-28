import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorMyStockComponent } from './distributor-my-stock.component';

describe('DistributorMyStockComponent', () => {
  let component: DistributorMyStockComponent;
  let fixture: ComponentFixture<DistributorMyStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorMyStockComponent]
    });
    fixture = TestBed.createComponent(DistributorMyStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
