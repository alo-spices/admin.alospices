import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDistributoresStockComponent } from './view-distributores-stock.component';

describe('ViewDistributoresStockComponent', () => {
  let component: ViewDistributoresStockComponent;
  let fixture: ComponentFixture<ViewDistributoresStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDistributoresStockComponent]
    });
    fixture = TestBed.createComponent(ViewDistributoresStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
