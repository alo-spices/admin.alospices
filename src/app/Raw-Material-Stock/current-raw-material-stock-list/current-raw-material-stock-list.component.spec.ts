import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRawMaterialStockListComponent } from './current-raw-material-stock-list.component';

describe('CurrentRawMaterialStockListComponent', () => {
  let component: CurrentRawMaterialStockListComponent;
  let fixture: ComponentFixture<CurrentRawMaterialStockListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentRawMaterialStockListComponent]
    });
    fixture = TestBed.createComponent(CurrentRawMaterialStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
