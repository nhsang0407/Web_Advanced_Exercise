import { TestBed } from '@angular/core/testing';

import { Ex13Service } from './ex13-service';

describe('Ex13Service', () => {
  let service: Ex13Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex13Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
