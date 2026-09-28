import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoyBeatPlanViewDetailsComponent } from './delivery-boy-beat-plan-view-details.component';

describe('DeliveryBoyBeatPlanViewDetailsComponent', () => {
  let component: DeliveryBoyBeatPlanViewDetailsComponent;
  let fixture: ComponentFixture<DeliveryBoyBeatPlanViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryBoyBeatPlanViewDetailsComponent]
    });
    fixture = TestBed.createComponent(DeliveryBoyBeatPlanViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
