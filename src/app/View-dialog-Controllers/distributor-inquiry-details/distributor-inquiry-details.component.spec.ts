import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorInquiryDetailsComponent } from './distributor-inquiry-details.component';

describe('DistributorInquiryDetailsComponent', () => {
  let component: DistributorInquiryDetailsComponent;
  let fixture: ComponentFixture<DistributorInquiryDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorInquiryDetailsComponent]
    });
    fixture = TestBed.createComponent(DistributorInquiryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
