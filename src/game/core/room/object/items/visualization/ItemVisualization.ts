import Item from "../../../../../engine/room/objects/items/Item";
import IRoomVisualization from "../../../IRoomVisualization";
import IRoomObjectVisualization from "../../IRoomObjectVisualization";

export default abstract class ItemVisualization implements IRoomObjectVisualization {

    protected item: Item;

    private needsUpdate: boolean = false

    constructor(item: Item) {
        this.item = item;
    }

    abstract render(): void

    public getItem() : Item {
        return this.item;
    }

    public getVisualizationType() : string  {
        return this.item.getBase().furniBase.visualizationType;
    }

    public getOffsetX(): number {
        throw new Error("Method not implemented.");
    }
    public getOffsetY(): number {
        throw new Error("Method not implemented.");
    }
    public getZIndex(): number {
        throw new Error("Method not implemented.");
    }

    public get NeedsUpdate(): boolean {
        return this.needsUpdate
    }

}