import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBeatplansDetailsComponent } from './view-beatplans-details.component';

describe('ViewBeatplansDetailsComponent', () => {
  let component: ViewBeatplansDetailsComponent;
  let fixture: ComponentFixture<ViewBeatplansDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBeatplansDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewBeatplansDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
