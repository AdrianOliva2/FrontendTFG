import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/classes/item';
import { Order } from 'src/app/classes/order';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  public items: Item[];
  public itemSelected: number = 1;
  public total: number = 0;

  constructor(private ordersService: OrdersService, public itemsService: ItemsService, private router: Router) {
    this.items = [];
  }

  public createOrder() {
    let orderId = this.ordersService.getNextId();
    let order = new Order(orderId, this.items);
    this.ordersService.addOrder(order);
    this.router.navigate(['/orders']);
  }

  public onSelectionChanged(event: number) {
    console.log(event);
    this.itemSelected = event;
  }

  public calculateTotal() {
    this.total = 0;
    this.items.forEach(item => {
      this.total += item.getPrice();
    });
  }

  public removeItem(itemId: number | undefined) {
    if (itemId != undefined) {
      let removed = false;
      this.items.forEach((item, index) => {
        if (item.getId() == itemId && !removed) {
          this.items.splice(index, 1);
          removed = true;
        }
      });
      this.calculateTotal();
    }
  }

  public addItem() {
    this.items.push(this.itemsService.getItem(this.itemSelected));
    this.calculateTotal();
  }

  ngOnInit(): void {
  }

}
