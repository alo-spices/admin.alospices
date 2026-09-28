import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubcategoryComponent } from './create-subcategory.component';

describe('CreateSubcategoryComponent', () => {
  let component: CreateSubcategoryComponent;
  let fixture: ComponentFixture<CreateSubcategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubcategoryComponent]
    });
    fixture = TestBed.createComponent(CreateSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
