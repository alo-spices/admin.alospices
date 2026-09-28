import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubSubCategoryComponent } from './view-sub-sub-category.component';

describe('ViewSubSubCategoryComponent', () => {
  let component: ViewSubSubCategoryComponent;
  let fixture: ComponentFixture<ViewSubSubCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubSubCategoryComponent]
    });
    fixture = TestBed.createComponent(ViewSubSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
