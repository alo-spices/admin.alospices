import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCreateLoginsComponent } from './warehouse-create-logins.component';

describe('WarehouseCreateLoginsComponent', () => {
  let component: WarehouseCreateLoginsComponent;
  let fixture: ComponentFixture<WarehouseCreateLoginsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseCreateLoginsComponent]
    });
    fixture = TestBed.createComponent(WarehouseCreateLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
