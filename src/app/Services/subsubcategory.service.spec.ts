import { TestBed } from '@angular/core/testing';

import { SubsubcategoryService } from './subsubcategory.service';

describe('SubsubcategoryService', () => {
  let service: SubsubcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsubcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
