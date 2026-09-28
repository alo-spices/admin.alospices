import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverisListComponent } from './deliveris-list.component';

describe('DeliverisListComponent', () => {
  let component: DeliverisListComponent;
  let fixture: ComponentFixture<DeliverisListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliverisListComponent]
    });
    fixture = TestBed.createComponent(DeliverisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
