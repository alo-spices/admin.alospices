import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawmaterialCreateComponent } from './rawmaterial-create.component';

describe('RawmaterialCreateComponent', () => {
  let component: RawmaterialCreateComponent;
  let fixture: ComponentFixture<RawmaterialCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RawmaterialCreateComponent]
    });
    fixture = TestBed.createComponent(RawmaterialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
