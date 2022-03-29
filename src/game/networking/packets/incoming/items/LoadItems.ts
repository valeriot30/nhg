import MessageHandler from "../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../Engine";
import FloorItem from "../../../../engine/room/objects/items/FloorItem";
import WallItem from "../../../../engine/room/objects/items/WallItem";
import InventoryUI from "../../../../engine/ui/components/inventory/InventoryUI";
import StaticContainerUI from "../../../../engine/ui/components/static/StaticContainerUI";
import UIComponent from "../../../../engine/ui/components/UIComponentEnum";
import FurniBase from "../../../../engine/ui/imagers/items/FurniBase";
import FurniImager, { ItemType } from "../../../../engine/ui/imagers/items/FurniImager";
import { FurniSprite } from "../../../../engine/ui/imagers/items/FurniSprite";
import Point3d from "../../../../utils/point/Point3d";

export default class LoadItems extends MessageHandler {
    public handle(): void {
        let items = this.message;

        let InventoryUI = Engine.getInstance().userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.InventoryUI) as InventoryUI

        for(let itemData of items.data) {
            let type: ItemType = itemData.item_type as ItemType
            let base = Engine.getInstance().userInterfaceManager?.getFurniImager().loadFurniSprite(type, itemData.baseName).then((sprite: FurniSprite) => {
                sprite.start()
                let Item = type === ItemType.FloorItem ? new FloorItem(null, itemData.id, itemData.name, new Point3d(0, 0, 0), sprite) : new WallItem(null, itemData.id, itemData.name, new Point3d(0, 0, 0), sprite);
                InventoryUI.addItem(Item)
                //Item.getVisualization()?.render()
            }).catch((err) => console.log(err));
        }
    }
    
}