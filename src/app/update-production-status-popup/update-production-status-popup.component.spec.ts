import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductionStatusPopupComponent } from './update-production-status-popup.component';

describe('UpdateProductionStatusPopupComponent', () => {
  let component: UpdateProductionStatusPopupComponent;
  let fixture: ComponentFixture<UpdateProductionStatusPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductionStatusPopupComponent]
    });
    fixture = TestBed.createComponent(UpdateProductionStatusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
