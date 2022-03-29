import IRoomMapObject from "../../../../core/room/object/map/IRoomMapObject";
import IRoomMapPlane from "../../../../core/room/object/map/IRoomMapPlane";
import RoomPlaneType from "./RoomPlaneTypeEnum";
import RoomObjectController from "../../../../core/room/object/RoomObjectController";
import Point3d from "../../../../utils/point/Point3d";
import LogicPlane from "./logic/LogicPlane";
import VisualizationPlane from "./visualization/VisualizationPlane"
import RoomLayout from "../../RoomLayout";

export default abstract class RoomPlane extends RoomObjectController implements IRoomMapPlane {

    private room: RoomLayout
    private type: RoomPlaneType
    
    private mapObjects: Array<IRoomMapObject> = new Array()

    constructor(room: RoomLayout, type: RoomPlaneType) {
        super("plane" + type, new Point3d(0,0,0), null, null)
        this.room = room
        this.type = type

        this.logic = (new LogicPlane(this))
        this.visualization = (new VisualizationPlane(this))
    }

    public addMapObject(obj: IRoomMapObject) : void {
        this.mapObjects.push(obj)
    }

    public getMapObjects() : Array<IRoomMapObject> {
        return this.mapObjects
    }

    public getType() : RoomPlaneType {
        return this.type
    }

    public getRoom() : RoomLayout {
        return this.room
    }

    
}