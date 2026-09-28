import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorListComponent } from './distributor-list.component';

describe('DistributorListComponent', () => {
  let component: DistributorListComponent;
  let fixture: ComponentFixture<DistributorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorListComponent]
    });
    fixture = TestBed.createComponent(DistributorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
