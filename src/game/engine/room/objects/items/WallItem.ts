import Point3d from "../../../../utils/point/Point3d";
import { ItemType } from "../../../ui/imagers/items/FurniImager";
import { FurniSprite } from "../../../ui/imagers/items/FurniSprite";
import Room from "../../Room";
import Item from "./Item";

export default class WallItem extends Item {

    constructor(room: Room, id: string, position: Point3d, base: FurniSprite) {

        super(room, id, position, base);

    }
}