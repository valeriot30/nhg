import ItemLogic from "../../../../../core/room/object/items/logic/ItemLogic";
import { FurniSprite } from "../../../../ui/imagers/items/FurniSprite";
import Item from "../Item";

export default class ItemLogicBasic extends ItemLogic {

    constructor(item: Item) {
        super(item);
    }
    
    public tick(delta: number) {
        
    }

    public registerEvents() : void {
        
    }

}