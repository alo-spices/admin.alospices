import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductionComponent } from './update-production.component';

describe('UpdateProductionComponent', () => {
  let component: UpdateProductionComponent;
  let fixture: ComponentFixture<UpdateProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductionComponent]
    });
    fixture = TestBed.createComponent(UpdateProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
