import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesViewDetailsComponent } from './parties-view-details.component';

describe('PartiesViewDetailsComponent', () => {
  let component: PartiesViewDetailsComponent;
  let fixture: ComponentFixture<PartiesViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesViewDetailsComponent]
    });
    fixture = TestBed.createComponent(PartiesViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
