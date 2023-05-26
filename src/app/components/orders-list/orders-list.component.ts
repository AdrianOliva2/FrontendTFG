import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/classes/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  public orders?: Order[];

  constructor(private ordersService: OrdersService) {
    this.ordersService.$orders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  ngOnInit(): void {
  }

}
