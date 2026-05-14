import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(undefined, undefined, 'test@example.com')).toBeTruthy();
  });
});
