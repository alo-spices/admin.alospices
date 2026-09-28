import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReciveCreateComponent } from './stock-recive-create.component';

describe('StockReciveCreateComponent', () => {
  let component: StockReciveCreateComponent;
  let fixture: ComponentFixture<StockReciveCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockReciveCreateComponent]
    });
    fixture = TestBed.createComponent(StockReciveCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
