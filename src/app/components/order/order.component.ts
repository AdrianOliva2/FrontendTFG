import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/classes/order';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order?: Order;
  itemSelected: number = 1;

  constructor(private ordersService: OrdersService, public itemsService: ItemsService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.order = this.ordersService.getOrder(params['id']);
    });
  }

  public onSelectionChanged(event: number) {
    console.log(event);
    this.itemSelected = event;
  }

  public addItem() {
    this.order?.addItem(this.itemsService, this.itemSelected);
    this.order?.getTotal();
    this.ordersService.updateOrder(this.order);
  }

  public removeOrder() {
    this.ordersService.deleteOrder(this.order?.getId());
    this.router.navigate(['/orders']);
  }

  ngOnInit(): void {
  }

}
