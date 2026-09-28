import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoyBeatPlanListComponent } from './delivery-boy-beat-plan-list.component';

describe('DeliveryBoyBeatPlanListComponent', () => {
  let component: DeliveryBoyBeatPlanListComponent;
  let fixture: ComponentFixture<DeliveryBoyBeatPlanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryBoyBeatPlanListComponent]
    });
    fixture = TestBed.createComponent(DeliveryBoyBeatPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
