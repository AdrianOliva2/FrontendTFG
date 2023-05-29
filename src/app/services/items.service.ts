import { Injectable } from '@angular/core';
import { Item } from '../classes/item';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items?: Item[];
  private _$items?: BehaviorSubject<Item[]>;  

  constructor(private httpClient: HttpClient) {
    //this.loadItems();
    this.items = [
      new Item(1, 'Coca-Cola', 'Coca-Cola', 2.50, 'https://w7.pngwing.com/pngs/717/116/png-transparent-coca-cola-logo-coca-cola-logo-company-business-cola-company-text-photography.png'),
      new Item(2, 'Hamburguesa clásica', 'Deliciosa hamburguesa con carne jugosa, lechuga, tomate y queso', 8.50, 'https://example.com/hamburguesa.jpg'),
      new Item(3, 'Pasta Alfredo', 'Fettuccine cocinado al dente con salsa cremosa de queso parmesano', 12.00, 'https://example.com/pasta.jpg'),
      new Item(4, 'Ensalada César', 'Fresca mezcla de lechuga, pollo a la parrilla, croutones y aderezo César', 10.50, 'https://example.com/ensalada.jpg'),
      new Item(5, 'Pizza Margherita', 'Deliciosa pizza con salsa de tomate, mozzarella fresca y albahaca', 11.50, 'https://example.com/pizza.jpg'),
      new Item(6, 'Salmón a la parrilla', 'Filete de salmón fresco a la parrilla con salsa de limón y hierbas', 15.00, 'https://example.com/salmon.jpg'),
      new Item(7, 'Tiramisú', 'Postre italiano clásico hecho con capas de bizcocho, café y crema mascarpone', 6.50, 'https://example.com/tiramisu.jpg'),
      new Item(8, 'Mojito', 'Refrescante cóctel con ron, menta fresca, lima y soda', 9.00, 'https://example.com/mojito.jpg'),
      new Item(9, 'Té helado', 'Té negro helado con limón y menta', 2.50, 'https://example.com/tehelado.jpg'),
      new Item(10, 'Papas fritas', 'Crujientes papas fritas sazonadas', 4.00, 'https://example.com/papasfritas.jpg')
    ];
    this._$items = new BehaviorSubject<Item[]>(this.items);
  }

  public async loadItems() {
    let httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    this.httpClient.get<Item[]>('http://localhost:8080/item', httpOptions).subscribe((items: Item[]) => {
      this.items = items;
      this._$items = new BehaviorSubject<Item[]>(this.items);
    });
  }

  public addItem(item: Item) {
    let httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };

    this.httpClient.post<Item>('http://localhost:8080/item/create', item, httpOptions).subscribe((item: Item) => {
      this.items?.push(item);
      if (this._$items) this._$items?.next(this.items!);
    });
  }

  public updateItem(item: Item) {
    let httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };

    this.httpClient.put<Item>('http://localhost:8080/item/update/' + item?.getId(), item, httpOptions).subscribe((item: Item) => {
      this.items?.forEach((item: Item, index: number) => {
        if (item.getId() === item.getId()) {
          this.items?.splice(index, 1, item);
        }
      });
      if (this._$items) this._$items?.next(this.items!);
    });
  }

  public deleteItem(item: Item) {
    let httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };

    this.httpClient.delete<Item>('http://localhost:8080/item/delete/' + item.getId(), httpOptions).subscribe((item: Item) => {
      this.items?.forEach((item: Item, index: number) => {
        if (item.getId() === item.getId()) {
          this.items?.splice(index, 1);
        }
      });
      if (this._$items) this._$items?.next(this.items!);
    });
  }

  public getItem(id: number): Item {
    return this.items?.find((item: Item) => item.getId() == id)!;
  }

  public getItems(): Item[] | undefined {
    return this.items;
  }

  public $items(): BehaviorSubject<Item[]> | undefined {
    return this._$items;
  }
}
