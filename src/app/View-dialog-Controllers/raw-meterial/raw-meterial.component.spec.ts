import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMeterialComponent } from './raw-meterial.component';

describe('RawMeterialComponent', () => {
  let component: RawMeterialComponent;
  let fixture: ComponentFixture<RawMeterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RawMeterialComponent]
    });
    fixture = TestBed.createComponent(RawMeterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
