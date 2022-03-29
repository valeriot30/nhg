import RoomObjectController from "../../../../core/room/object/RoomObjectController"
import Point3d from "../../../../utils/point/Point3d"
import VisualizationPointer from "./visualization/VisualizationPointer"
import LogicPointer from "./logic/LogicPointer"
import RoomVisualization from "../../visualization/RoomVisualization"
import MapData from "./MapData"
import RoomLayout from "../../RoomLayout"

export default class Pointer extends RoomObjectController {

    private room: RoomLayout

    constructor(room: RoomLayout) {
        super("roomPointer", new Point3d(0,0,0), null, null)

        this.room = room

        this.getCanvas().name = this.id
        this.getCanvas().width = MapData.tileWidth
        this.getCanvas().height = MapData.tileHeight

        this.visualization = new VisualizationPointer(this)
        this.logic = new LogicPointer(this)
    }
    
    public getCanvas() : PIXI.Container {
        return (this.room.Visualization as RoomVisualization).getCanvasPointer()
    }

    public getRoomLayout(): RoomLayout  {
        return this.room
    }
}