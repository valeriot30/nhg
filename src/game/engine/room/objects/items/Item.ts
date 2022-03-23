import RoomObjectController from "../../../../core/room/object/RoomObjectController";
import IRoomItemObject from "../../../../core/room/object/items/IRoomItemObject";
import Room from "../../Room";
import Point3d from "../../../../utils/point/Point3d";
import ItemLogic from "../../../../core/room/object/items/logic/ItemLogic";
import ItemVisualization from "./visualization/ItemVisualizationStatic";
import IRoomVisualization from "../../../../core/room/IRoomVisualization";
import { FurniSprite } from "../../../ui/imagers/items/FurniSprite";
import ItemVisualizationStatic from "./visualization/ItemVisualizationStatic";
import ItemVisualizationAnimated from "./visualization/ItemVisualizationAnimated";
import ItemLogicBasic from "./logic/ItemLogicBasic";
import ItemLogicMultiState from "./logic/ItemLogicMultiState";
import RoomVisualization from "../../visualization/RoomVisualization";
import Engine from "../../../../Engine";

export default abstract class Item extends RoomObjectController implements IRoomItemObject {

    private _room: Room
    private base: FurniSprite;

    constructor(room: Room, id: string, position: Point3d, sprite: FurniSprite) {

        super(id, position, null, null)

        this.base = sprite;

        this._room = room;

        let visualization = this.getItemVisualizationFromType(sprite.furniBase.data.visualization.type)
        let logic = this.getItemLogicFromType(sprite.furniBase.data.logic.type)

        this.setVisualization(visualization);
        this.setLogic(logic);

        //console.log(visualization);

    }

    private getItemVisualizationFromType(type: string) : ItemVisualization
    {
        switch(type) {

            default:
                case "furniture_static":
                    return new ItemVisualizationStatic(this);
                case "furniture_animated":
                    return new ItemVisualizationAnimated(this)

        }
    }

    private getItemLogicFromType(type: string) : ItemLogic {

        switch(type) {

            default:
                case "furniture_basic":
                    return new ItemLogicBasic(this);
                case "furniture_multistate":
                    return new ItemLogicMultiState(this)
        }

    }

    public get Room() : Room {
        return this._room;
    }

    public get Base() : FurniSprite {
        return this.base;
    }
}