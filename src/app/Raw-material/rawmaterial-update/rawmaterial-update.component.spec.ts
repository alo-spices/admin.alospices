import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawmaterialUpdateComponent } from './rawmaterial-update.component';

describe('RawmaterialUpdateComponent', () => {
  let component: RawmaterialUpdateComponent;
  let fixture: ComponentFixture<RawmaterialUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RawmaterialUpdateComponent]
    });
    fixture = TestBed.createComponent(RawmaterialUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
