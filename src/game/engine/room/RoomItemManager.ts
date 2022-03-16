import IRoomManager from "../../core/room/IRoomManager";
import Item from "./objects/items/Item";

export default class RoomItemManager implements IRoomManager {

    private items: Map<string, Item> = new Map()

    public addItem(item: Item) : void {
        this.items.set(item.getId(), item)
    }

    public removeItem(itemId: string) : void {
        this.items.delete(itemId)
    }

    public getItems() : Map<string, Item> {
        return this.items
    }

    public getItemById(id: string) : Item | undefined {
        return this.items.get(id);
    }

    public deleteItems() : void {
        this.items.clear()
    }

    public tick(delta: number) {
        this.items.forEach((item: Item) => {
            item.getLogic()?.tick(delta)
        })
    }

}