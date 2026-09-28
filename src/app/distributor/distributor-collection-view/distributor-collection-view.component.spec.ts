import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorCollectionViewComponent } from './distributor-collection-view.component';

describe('DistributorCollectionViewComponent', () => {
  let component: DistributorCollectionViewComponent;
  let fixture: ComponentFixture<DistributorCollectionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorCollectionViewComponent]
    });
    fixture = TestBed.createComponent(DistributorCollectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
