import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductionsComponent } from './view-productions.component';

describe('ViewProductionsComponent', () => {
  let component: ViewProductionsComponent;
  let fixture: ComponentFixture<ViewProductionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProductionsComponent]
    });
    fixture = TestBed.createComponent(ViewProductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
