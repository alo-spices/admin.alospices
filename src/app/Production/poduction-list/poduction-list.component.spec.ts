import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoductionListComponent } from './poduction-list.component';

describe('PoductionListComponent', () => {
  let component: PoductionListComponent;
  let fixture: ComponentFixture<PoductionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoductionListComponent]
    });
    fixture = TestBed.createComponent(PoductionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
