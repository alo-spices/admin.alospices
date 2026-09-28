import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesListComponent } from './parties-list.component';

describe('PartiesListComponent', () => {
  let component: PartiesListComponent;
  let fixture: ComponentFixture<PartiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesListComponent]
    });
    fixture = TestBed.createComponent(PartiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
