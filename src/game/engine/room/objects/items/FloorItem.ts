import Point3d from "../../../../utils/point/Point3d";
import { FurniSprite } from "../../../ui/imagers/items/FurniSprite";
import Room from "../../Room";
import Item from "./Item";

export default class FloorItem extends Item {

    constructor(room: Room | null, id: string, name: string, position: Point3d, baseItem: FurniSprite) {
        super(room, id, name, position, baseItem);
    }
}