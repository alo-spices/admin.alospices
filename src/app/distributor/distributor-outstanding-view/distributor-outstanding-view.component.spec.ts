import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorOutstandingViewComponent } from './distributor-outstanding-view.component';

describe('DistributorOutstandingViewComponent', () => {
  let component: DistributorOutstandingViewComponent;
  let fixture: ComponentFixture<DistributorOutstandingViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorOutstandingViewComponent]
    });
    fixture = TestBed.createComponent(DistributorOutstandingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
