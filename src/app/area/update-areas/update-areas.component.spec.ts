import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAreasComponent } from './update-areas.component';

describe('UpdateAreasComponent', () => {
  let component: UpdateAreasComponent;
  let fixture: ComponentFixture<UpdateAreasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAreasComponent]
    });
    fixture = TestBed.createComponent(UpdateAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
