import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuidenceFileComponent } from './admin-guidence-file.component';

describe('AdminGuidenceFileComponent', () => {
  let component: AdminGuidenceFileComponent;
  let fixture: ComponentFixture<AdminGuidenceFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGuidenceFileComponent]
    });
    fixture = TestBed.createComponent(AdminGuidenceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
