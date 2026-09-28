import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoyBeatPlanComponent } from './delivery-boy-beat-plan.component';

describe('DeliveryBoyBeatPlanComponent', () => {
  let component: DeliveryBoyBeatPlanComponent;
  let fixture: ComponentFixture<DeliveryBoyBeatPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryBoyBeatPlanComponent]
    });
    fixture = TestBed.createComponent(DeliveryBoyBeatPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
