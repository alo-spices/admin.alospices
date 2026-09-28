import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDistributorDetailsComponent } from './view-distributor-details.component';

describe('ViewDistributorDetailsComponent', () => {
  let component: ViewDistributorDetailsComponent;
  let fixture: ComponentFixture<ViewDistributorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDistributorDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewDistributorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
