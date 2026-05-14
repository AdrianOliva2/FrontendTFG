import { Item } from './item';

describe('Item', () => {
  it('should create an instance', () => {
    expect(new Item(undefined, 'Test Item', 'Description', 9.99, 'image.jpg')).toBeTruthy();
  });
});
