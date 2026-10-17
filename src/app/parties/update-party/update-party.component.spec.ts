import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartyComponent } from './update-party.component';

describe('UpdatePartyComponent', () => {
  let component: UpdatePartyComponent;
  let fixture: ComponentFixture<UpdatePartyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePartyComponent]
    });
    fixture = TestBed.createComponent(UpdatePartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
