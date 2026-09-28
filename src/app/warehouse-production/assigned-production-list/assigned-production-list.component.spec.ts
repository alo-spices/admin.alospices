import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedProductionListComponent } from './assigned-production-list.component';

describe('AssignedProductionListComponent', () => {
  let component: AssignedProductionListComponent;
  let fixture: ComponentFixture<AssignedProductionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedProductionListComponent]
    });
    fixture = TestBed.createComponent(AssignedProductionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
