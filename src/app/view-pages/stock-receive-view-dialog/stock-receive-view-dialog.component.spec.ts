import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReceiveViewDialogComponent } from './stock-receive-view-dialog.component';

describe('StockReceiveViewDialogComponent', () => {
  let component: StockReceiveViewDialogComponent;
  let fixture: ComponentFixture<StockReceiveViewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockReceiveViewDialogComponent]
    });
    fixture = TestBed.createComponent(StockReceiveViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
