import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoutesComponent } from './update-routes.component';

describe('UpdateRoutesComponent', () => {
  let component: UpdateRoutesComponent;
  let fixture: ComponentFixture<UpdateRoutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRoutesComponent]
    });
    fixture = TestBed.createComponent(UpdateRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
