import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseLoginsListComponent } from './warehouse-logins-list.component';

describe('WarehouseLoginsListComponent', () => {
  let component: WarehouseLoginsListComponent;
  let fixture: ComponentFixture<WarehouseLoginsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseLoginsListComponent]
    });
    fixture = TestBed.createComponent(WarehouseLoginsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
