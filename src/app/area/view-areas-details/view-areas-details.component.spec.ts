import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAreasDetailsComponent } from './view-areas-details.component';

describe('ViewAreasDetailsComponent', () => {
  let component: ViewAreasDetailsComponent;
  let fixture: ComponentFixture<ViewAreasDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAreasDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewAreasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
