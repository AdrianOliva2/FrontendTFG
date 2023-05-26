export class Item {

    private id?: number;
    private name: string;
    private description: string;
    private price: number;
    private image: string;

    public constructor(id: number | undefined, name: string, description: string, price: number, image: string) {
        this.setId(id);
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public setId(id: number | undefined) {
        if (id !== undefined && id > 0)  this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number) {
        this.price = price;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string) {
        this.image = image;
    }

}
