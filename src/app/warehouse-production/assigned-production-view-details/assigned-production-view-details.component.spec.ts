import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedProductionViewDetailsComponent } from './assigned-production-view-details.component';

describe('AssignedProductionViewDetailsComponent', () => {
  let component: AssignedProductionViewDetailsComponent;
  let fixture: ComponentFixture<AssignedProductionViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedProductionViewDetailsComponent]
    });
    fixture = TestBed.createComponent(AssignedProductionViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
