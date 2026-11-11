import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseAssingedDistributoresListComponent } from './warehouse-assinged-distributores-list.component';

describe('WarehouseAssingedDistributoresListComponent', () => {
  let component: WarehouseAssingedDistributoresListComponent;
  let fixture: ComponentFixture<WarehouseAssingedDistributoresListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseAssingedDistributoresListComponent]
    });
    fixture = TestBed.createComponent(WarehouseAssingedDistributoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
