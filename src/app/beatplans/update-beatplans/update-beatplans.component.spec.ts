import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBeatplansComponent } from './update-beatplans.component';

describe('UpdateBeatplansComponent', () => {
  let component: UpdateBeatplansComponent;
  let fixture: ComponentFixture<UpdateBeatplansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBeatplansComponent]
    });
    fixture = TestBed.createComponent(UpdateBeatplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
