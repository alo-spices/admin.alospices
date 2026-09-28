import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawmaterialListComponent } from './rawmaterial-list.component';

describe('RawmaterialListComponent', () => {
  let component: RawmaterialListComponent;
  let fixture: ComponentFixture<RawmaterialListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RawmaterialListComponent]
    });
    fixture = TestBed.createComponent(RawmaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
