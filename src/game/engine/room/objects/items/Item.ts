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

    private _room: Room | null
    private base: FurniSprite;
    private name: string;

    constructor(room: Room | null, id: string, name: string, position: Point3d, baseItem: FurniSprite) {

        super(id, position, null, null)


        this.base = baseItem;

        //Engine.getInstance().Application?.Viewport.addChild(this.base)

        this.name = name;

        this._room = room;

        let visualization = this.getItemVisualizationFromType(this.base.furniBase.data.visualization.type)
        let logic = this.getItemLogicFromType(this.base.furniBase.data.logic.type)

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

    public get Room() : Room | null {
        return this._room;
    }

    public get Base() : FurniSprite {
        return this.base;
    }

    public get Id(): string { return this.id; }
    public get Name(): string { return this.name; }
}