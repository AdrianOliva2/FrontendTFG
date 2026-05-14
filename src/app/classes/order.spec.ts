import { Order } from './order';
import { Item } from './item';

describe('Order', () => {
  it('should create an instance', () => {
    expect(new Order(undefined, [new Item(undefined, 'Test Item', 'Description', 9.99, 'image.jpg')])).toBeTruthy();
  });
});
