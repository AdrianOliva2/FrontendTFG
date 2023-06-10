import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/classes/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items?: Item[];

  constructor(private itemsService: ItemsService, private router: Router) {
    itemsService.$items()?.subscribe((items: Item[]) => {
        this.items = items;
      }
    );
  }

  ngOnInit(): void {
  }

  public onClick(item: Item): void {
    console.log(item);
    this.router.navigate(['/item', item.getId()]);
  }

}
