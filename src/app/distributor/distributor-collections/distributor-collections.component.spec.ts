import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorCollectionsComponent } from './distributor-collections.component';

describe('DistributorCollectionsComponent', () => {
  let component: DistributorCollectionsComponent;
  let fixture: ComponentFixture<DistributorCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorCollectionsComponent]
    });
    fixture = TestBed.createComponent(DistributorCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
