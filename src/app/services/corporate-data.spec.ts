import { TestBed } from '@angular/core/testing';

import { CorporateData } from './corporate-data';

describe('CorporateData', () => {
  let service: CorporateData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
