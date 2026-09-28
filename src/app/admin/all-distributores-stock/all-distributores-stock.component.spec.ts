import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDistributoresStockComponent } from './all-distributores-stock.component';

describe('AllDistributoresStockComponent', () => {
  let component: AllDistributoresStockComponent;
  let fixture: ComponentFixture<AllDistributoresStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDistributoresStockComponent]
    });
    fixture = TestBed.createComponent(AllDistributoresStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
