import ItemLogic from "../../../../core/room/object/items/logic/ItemLogic";
import ItemVisualization from "../../../../core/room/object/items/visualization/ItemVisualization";
import Engine from "../../../../Engine";
import Point3d from "../../../../utils/point/Point3d";
import { ItemType } from "../../../ui/imagers/items/FurniImager";
import { FurniSprite } from "../../../ui/imagers/items/FurniSprite";
import Room from "../../Room";
import RoomVisualization from "../../visualization/RoomVisualization";
import Item from "./Item";
import ItemLogicBasic from "./logic/ItemLogicBasic";
import ItemLogicMultiState from "./logic/ItemLogicMultiState";
import ItemVisualizationAnimated from "./visualization/ItemVisualizationAnimated";
import ItemVisualizationStatic from "./visualization/ItemVisualizationStatic";

export default class FloorItem extends Item {

    constructor(room: Room | null, id: string, name: string, position: Point3d, baseItem: FurniSprite) {
        super(room, id, name, position, baseItem);
    }
}