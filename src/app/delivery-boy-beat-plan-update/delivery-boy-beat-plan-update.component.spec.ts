import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoyBeatPlanUpdateComponent } from './delivery-boy-beat-plan-update.component';

describe('DeliveryBoyBeatPlanUpdateComponent', () => {
  let component: DeliveryBoyBeatPlanUpdateComponent;
  let fixture: ComponentFixture<DeliveryBoyBeatPlanUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryBoyBeatPlanUpdateComponent]
    });
    fixture = TestBed.createComponent(DeliveryBoyBeatPlanUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
