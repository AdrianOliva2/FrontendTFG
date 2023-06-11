import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../classes/order';
import { BehaviorSubject } from 'rxjs';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orders: Order[];
  private _$orders: BehaviorSubject<Order[]>;

  constructor(private httpClient: HttpClient, private itemsService: ItemsService) {
    this.orders = [
      new Order(1, [itemsService.getItem(1), itemsService.getItem(2), itemsService.getItem(3)]),
      new Order(2, [itemsService.getItem(4), itemsService.getItem(5), itemsService.getItem(6)]),
      new Order(3, [itemsService.getItem(7), itemsService.getItem(8), itemsService.getItem(9), itemsService.getItem(10)])
    ];
    this._$orders = new BehaviorSubject<Order[]>(this.orders);
    //this.loadOrders();
  }

  public loadOrders() {
    this.httpClient.get<Order[]>('http://localhost:8080/order').subscribe((orders: Order[]) => {
      this.orders = orders;
      this._$orders.next(this.orders);
    });
  }

  public getNextId(): number {
    let maxId: number = 0;
    this.orders.forEach((order: Order) => {
      if (order !== undefined && order.getId() !== undefined && order.getId()! > maxId) {
        maxId = order.getId()!;
      }
    });
    return maxId + 1;
  }

  public getOrders(): Order[] {
    return this.orders;
  }

  public getOrder(id: number): Order | undefined {
    return this.orders.find((order: Order) => order.getId() == id);
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
    if (order.getId() !== undefined) {
      /*this.httpClient.post('http://localhost:8080/order', order).subscribe(() => {
        this.loadOrders();
      });*/
      this.orders.push(order);
      this._$orders.next(this.orders);
      return true;
    }
    return false;
  }

  public deleteOrder(orderId: number | undefined): boolean {
    if (orderId !== undefined) {
      /*this.httpClient.delete(`http://localhost:8080/order/${orderId}`).subscribe(() => {
        this.loadOrders();
      });*/
      this.orders = this.orders.filter((order: Order) => order.getId() !== orderId);
      this._$orders.next(this.orders);
      return true;
    }
    return false;
  }

  public updateOrder(order: Order | undefined): boolean {
    if (order !== undefined && order.getId() !== undefined) {
      /*this.httpClient.put(`http://localhost:8080/order/update/${order.getId()}`, order).subscribe(() => {
        this.loadOrders();
      });*/
      this.orders.forEach((o: Order, index: number) => {
        if (o.getId() == order?.getId()) {
          this.orders[index] = order;
        }
      });
      return true;
    }
    return false;
  }
}
