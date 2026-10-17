import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorInquiryListComponent } from './distributor-inquiry-list.component';

describe('DistributorInquiryListComponent', () => {
  let component: DistributorInquiryListComponent;
  let fixture: ComponentFixture<DistributorInquiryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorInquiryListComponent]
    });
    fixture = TestBed.createComponent(DistributorInquiryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
