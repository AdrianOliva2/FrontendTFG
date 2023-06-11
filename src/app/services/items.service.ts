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
      new Item(1, 'Coca-Cola', 'Refrescante bebida gaseosa con un sabor inconfundible.', 2.50, 'https://ak.uecdn.es/p/108/thumbnail/entry_id/0_3er0c0tm/width/660/type/2/bgcolor/000000/0_3er0c0tm.jpg'),
      new Item(2, 'Hamburguesa clásica', 'Deliciosa hamburguesa con carne jugosa, lechuga, tomate y queso.', 8.50, 'https://estaticos-cdn.elperiodico.com/clip/251a2962-95a1-42f7-a35e-f15a10685a8b_alta-libre-aspect-ratio_default_0.jpg'),
      new Item(3, 'Pasta Alfredo', 'Fettuccine cocinado al dente con salsa cremosa de queso parmesano.', 12.00, 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F21%2F2016%2F08%2F17%2Fpasta-alfredo.jpg-2000.jpg&q=60'),
      new Item(4, 'Ensalada César', 'Fresca mezcla de lechuga, pollo a la parrilla, croutones y aderezo César.', 10.50, 'https://cdn.kiwilimon.com/brightcove/6506/6506.jpg'),
      new Item(5, 'Pizza Margherita', 'Deliciosa pizza con salsa de tomate, mozzarella fresca y albahaca.', 11.50, 'https://images.ctfassets.net/nw5k25xfqsik/64VwvKFqxMWQORE10Tn8pY/200c0538099dc4d1cf62fd07ce59c2af/20220211142754-margherita-9920.jpg'),
      new Item(6, 'Salmón a la parrilla', 'Filete de salmón fresco a la parrilla con salsa de limón y hierbas.', 15.00, 'https://images.aws.nestle.recipes/original/b3748a04430e8edd24cefbcb26ecde67_bak---17---grilled-salmon-with-creamy-dill-sauce-1222.jpg'),
      new Item(7, 'Tiramisú', 'Postre italiano clásico con capas de bizcocho, café y crema mascarpone.', 6.50, 'https://sivarious.com/wp-content/uploads/2020/10/tiramisu-casero.jpg'),
      new Item(8, 'Mojito', 'Refrescante cóctel con ron, menta fresca, lima y soda.', 9.00, 'https://cocina-casera.com/wp-content/uploads/2017/07/como-hacer-mojito-casero.jpg'),
      new Item(9, 'Té helado', 'Té negro helado con limón y menta.', 2.50, 'https://comerbeber.com/archivos/styles/xlarge/public/imagen/2017/04/tehelado_as_110708782_75.jpg?itok=9VOdCl1X'),
      new Item(10, 'Patatas fritas', 'Crujientes patatas fritas sazonadas.', 4.00, 'https://recetinas.com/wp-content/uploads/2022/10/patatas-fritas.jpg')
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
