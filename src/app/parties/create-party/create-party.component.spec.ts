import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartyComponent } from './create-party.component';

describe('CreatePartyComponent', () => {
  let component: CreatePartyComponent;
  let fixture: ComponentFixture<CreatePartyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePartyComponent]
    });
    fixture = TestBed.createComponent(CreatePartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
