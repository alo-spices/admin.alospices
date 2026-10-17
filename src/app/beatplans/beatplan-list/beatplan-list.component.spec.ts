import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatplanListComponent } from './beatplan-list.component';

describe('BeatplanListComponent', () => {
  let component: BeatplanListComponent;
  let fixture: ComponentFixture<BeatplanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeatplanListComponent]
    });
    fixture = TestBed.createComponent(BeatplanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
