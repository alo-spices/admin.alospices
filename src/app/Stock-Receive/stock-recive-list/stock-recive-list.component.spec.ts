import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReciveListComponent } from './stock-recive-list.component';

describe('StockReciveListComponent', () => {
  let component: StockReciveListComponent;
  let fixture: ComponentFixture<StockReciveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockReciveListComponent]
    });
    fixture = TestBed.createComponent(StockReciveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
