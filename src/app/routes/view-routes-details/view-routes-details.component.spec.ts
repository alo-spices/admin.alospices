import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoutesDetailsComponent } from './view-routes-details.component';

describe('ViewRoutesDetailsComponent', () => {
  let component: ViewRoutesDetailsComponent;
  let fixture: ComponentFixture<ViewRoutesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRoutesDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewRoutesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
