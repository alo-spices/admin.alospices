import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBeatplansComponent } from './create-beatplans.component';

describe('CreateBeatplansComponent', () => {
  let component: CreateBeatplansComponent;
  let fixture: ComponentFixture<CreateBeatplansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBeatplansComponent]
    });
    fixture = TestBed.createComponent(CreateBeatplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
