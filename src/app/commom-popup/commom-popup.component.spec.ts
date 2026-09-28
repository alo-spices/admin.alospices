import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommomPopupComponent } from './commom-popup.component';

describe('CommomPopupComponent', () => {
  let component: CommomPopupComponent;
  let fixture: ComponentFixture<CommomPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommomPopupComponent]
    });
    fixture = TestBed.createComponent(CommomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
