
import LogicTile from "./logic/LogicTile"
import VisualizationTile from "./visualization/VisualizationTile"
import IRoomMapObject from "../../../../core/room/object/map/IRoomMapObject"
import RoomObjectController from "../../../../core/room/object/RoomObjectController"
import TileType from "./TileTypeEnum"
import Point3d from "../../../../utils/point/Point3d"
import ColorRGB from "../../../../utils/color/ColorRGB"
import RoomPlane from "./RoomPlane"

export default class Tile extends RoomObjectController implements IRoomMapObject {

    private type: TileType
    private color: ColorRGB

    private plane: RoomPlane


    constructor(plane: RoomPlane, id: string, position: Point3d, type: TileType, color: ColorRGB) {
        super(id, position, null, null)

        this.plane = plane

        this.type = type
        this.color = color

        this.setVisualization(new VisualizationTile(this))
        this.setLogic(new LogicTile(this))
    }

    public getColor(): ColorRGB {
        return this.color
    }

    public getType(): TileType {
        return this.type
    }

    public getPlane(): RoomPlane {
        return this.plane
    }

    public setType(type: TileType) : void {
        this.type = type
    }

}