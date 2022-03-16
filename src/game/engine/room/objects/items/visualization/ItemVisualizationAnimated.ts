import ItemVisualization from "../../../../../core/room/object/items/visualization/ItemVisualization";
import Item from "../Item";

export default class ItemVisualizationAnimated extends ItemVisualization {

    constructor(item: Item) {
        super(item)

    }

    public render() : void {
        this.item.getBase().nextFrame();
    }

}