import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../classes/order';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orders: Order[];
  private _$orders: BehaviorSubject<Order[]>;

  constructor(private httpClient: HttpClient) {
    this.orders = [];
    this._$orders = new BehaviorSubject<Order[]>(this.orders);
    this.loadOrders();
  }

  public loadOrders() {
    this.httpClient.get<Order[]>('http://localhost:8080/order').subscribe((orders: Order[]) => {
      this.orders = orders;
      this._$orders.next(this.orders);
    });
  }

  public getOrders(): Order[] {
    return this.orders;
  }

  public $orders() {
    return this._$orders.asObservable();
  }

  public completeOrder(order: Order): boolean {
    if (order.getId() !== undefined && localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== '') {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };
      this.httpClient.put(`http://localhost:8080/order/complete/${order.getId()}`, undefined, options).subscribe(() => {
        this.loadOrders();
      });
      return true;
    }
    return false;
  }

  public addOrder(order: Order): boolean {
    if (order.getId() === undefined) {
      this.httpClient.post('http://localhost:8080/order', order).subscribe(() => {
        this.loadOrders();
      });
      return true;
    }
    return false;
  }

  public deleteOrder(order: Order): boolean {
    if (order.getId() !== undefined) {
      this.httpClient.delete(`http://localhost:8080/order/${order.getId()}`).subscribe(() => {
        this.loadOrders();
      });
      return true;
    }
    return false;
  }

  public updateOrder(order: Order): boolean {
    if (order.getId() !== undefined) {
      this.httpClient.put(`http://localhost:8080/order/update/${order.getId()}`, order).subscribe(() => {
        this.loadOrders();
      });
      return true;
    }
    return false;
  }
}
