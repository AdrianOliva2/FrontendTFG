import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/classes/order';
import { User } from 'src/app/classes/user';
import { OrdersService } from 'src/app/services/orders.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders?: Order[];
  user?: User;

  constructor(public ordersService: OrdersService, private sessionService: SessionService) {
    this.user = this.sessionService.getUser();
    ordersService.$orders().subscribe((orders: Order[]) => {
        this.orders = orders;
      }
    );
  }

  ngOnInit(): void {
  }

  public completeOrder(order: Order, complete: boolean) {
    order.setCompleted(complete);
    this.ordersService.updateOrder(order);
  }

}
