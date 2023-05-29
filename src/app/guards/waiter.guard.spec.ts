import { TestBed } from '@angular/core/testing';

import { WaiterGuard } from './waiter.guard';

describe('WaiterGuard', () => {
  let guard: WaiterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WaiterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
