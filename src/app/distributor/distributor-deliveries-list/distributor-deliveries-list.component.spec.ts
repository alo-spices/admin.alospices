import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorDeliveriesListComponent } from './distributor-deliveries-list.component';

describe('DistributorDeliveriesListComponent', () => {
  let component: DistributorDeliveriesListComponent;
  let fixture: ComponentFixture<DistributorDeliveriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorDeliveriesListComponent]
    });
    fixture = TestBed.createComponent(DistributorDeliveriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
