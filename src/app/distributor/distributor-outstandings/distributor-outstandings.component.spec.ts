import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorOutstandingsComponent } from './distributor-outstandings.component';

describe('DistributorOutstandingsComponent', () => {
  let component: DistributorOutstandingsComponent;
  let fixture: ComponentFixture<DistributorOutstandingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorOutstandingsComponent]
    });
    fixture = TestBed.createComponent(DistributorOutstandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
