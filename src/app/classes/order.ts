import { ItemsService } from "../services/items.service";
import { Item } from "./item";

export class Order {

    private id?: number;
    private items: Item[];
    private total: number;
    private completed: boolean;

    public constructor(id: number | undefined, items: Item[]) {
        this.setId(id);
        this.items = items;
        this.completed = false;
        this.total = this.calculateTotal();
    }

    public getId(): number | undefined {
        return this.id;
    }

    public setId(id: number | undefined) {
        if (id !== undefined && id > 0)  this.id = id;
    }

    public getItems(): Item[] {
        return this.items;
    }

    public addItem(itemsService: ItemsService, itemId: number) {
        this.items.unshift(itemsService.getItem(itemId));
    }

    public removeItem(itemId: number | undefined) {
        let borrado: boolean = false;
        this.items.forEach((item: Item, index: number) => {
            if (item.getId() === itemId && !borrado) {
                this.items.splice(index, 1);
                borrado = true;
            }
        });
    }

    public setItems(items: Item[]) {
        this.items = items;
    }

    public getTotal(): number {
        this.total = this.calculateTotal();
        return this.total;
    }

    public calculateTotal() {
        let total = 0;
        this.items.forEach((item: Item) => {
            total += item.getPrice();
        });
        return total;
    }

    public getCompleted(): boolean {
        return this.completed;
    }

    public setCompleted(completed: boolean) {
        this.completed = completed;
    }

}
