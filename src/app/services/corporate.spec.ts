import { TestBed } from '@angular/core/testing';

import { Corporate } from './corporate';

describe('Corporate', () => {
  let service: Corporate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Corporate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
