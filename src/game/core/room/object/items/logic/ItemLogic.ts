import Engine from "../../../../../Engine";
import Item from "../../../../../engine/room/objects/items/Item";
import RoomVisualization from "../../../../../engine/room/visualization/RoomVisualization";
import PreviewBoxUI from "../../../../../engine/ui/components/general/PreviewBoxUI";
import UIComponent from "../../../../../engine/ui/components/UIComponentEnum";
import { FurniSprite } from "../../../../../engine/ui/imagers/items/FurniSprite";
import IRoomLogic from "../../../IRoomLogic";
import IRoomObjectLogic from "../../IRoomObjectLogic";

export default abstract class ItemLogic implements IRoomObjectLogic {

    protected item: Item;
    public frameTracker: number = 0;

    constructor(item: Item) {
        this.item = item;

        this.listen()
    }

    public listen() {
        this.item.getBase().interactive = true
        this.item.getBase().addListener("mousedown", this.togglePreview.bind(this))
        this.item.getBase().addListener("mouseup", this.onItemHover.bind(this))
    }


    protected abstract registerEvents(): void;


    public onItemHover() {
        //this.item.Room.getRoomLayout().getVisualization() as RoomVisualization)
    }

    public togglePreview() {
        let preview = Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.PreviewBoxUI) as PreviewBoxUI;

        preview.setItem(this.item)
        preview.show();
    }

    public tick(delta: number) {
    }


}