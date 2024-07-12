import { TestBed } from '@angular/core/testing';

import { SearchFoodsService } from './search-foods.service';

describe('SearchFoodsService', () => {
  let service: SearchFoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchFoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
