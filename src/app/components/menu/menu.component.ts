import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/classes/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items?: Item[];

  constructor(private itemsService: ItemsService) {
    itemsService.$items()?.subscribe((items: Item[]) => {
        this.items = items;
      }
    );
  }

  ngOnInit(): void {
  }

}
