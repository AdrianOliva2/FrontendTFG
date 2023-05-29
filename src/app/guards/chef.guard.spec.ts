import { TestBed } from '@angular/core/testing';

import { ChefGuard } from './chef.guard';

describe('ChefGuard', () => {
  let guard: ChefGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChefGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
