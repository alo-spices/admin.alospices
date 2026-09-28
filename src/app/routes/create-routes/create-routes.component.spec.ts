import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutesComponent } from './create-routes.component';

describe('CreateRoutesComponent', () => {
  let component: CreateRoutesComponent;
  let fixture: ComponentFixture<CreateRoutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoutesComponent]
    });
    fixture = TestBed.createComponent(CreateRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
