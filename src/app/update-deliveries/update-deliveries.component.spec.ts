import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeliveriesComponent } from './update-deliveries.component';

describe('UpdateDeliveriesComponent', () => {
  let component: UpdateDeliveriesComponent;
  let fixture: ComponentFixture<UpdateDeliveriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDeliveriesComponent]
    });
    fixture = TestBed.createComponent(UpdateDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
