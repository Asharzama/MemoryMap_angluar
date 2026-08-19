import { TestBed } from '@angular/core/testing';

import { LocationSelection } from './location-selection';

describe('LocationSelection', () => {
  let service: LocationSelection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationSelection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
