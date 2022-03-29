import RoomPlane from "./RoomPlane"
import RoomPlaneType from "./RoomPlaneTypeEnum"
import Tile from "./Tile"
import ColorRGB from "../../../../utils/color/ColorRGB"
import TileType from "./TileTypeEnum"
import MapTypeChecker from "./MapTypeChecker"
import Point3d from "../../../../utils/point/Point3d"
import RoomLayout from "../../RoomLayout"
import Point from "../../../../utils/point/Point"

export default class FloorPlane extends RoomPlane {

    constructor(room: RoomLayout) {
        super(room, RoomPlaneType.Floor)
    }

    public prepareTiles() : void {
        this.getRoom().getModelMaltrix().forEach((xRow, x) => {
            xRow.forEach((_, y) => {

                let position = new Point3d(x, y, this.getRoom().getModelMaltrix()[x][y])

                this.addMapObject(new Tile(
                    this,
                    `tile${ position.getX() }-${ position.getY() }`,
                    position,
                    MapTypeChecker.checkTileType(position, this.getRoom().getDoorPosition(), this.getRoom().getModelMaltrix()),
                    this.getRoom().getUniqueColor()
                ))
            }) 
        })
    }

    public setTileType(x: number, y: number, type: TileType) : void {
        this.getMapObjects().find((obj) => {
            if (obj instanceof Tile) {
                if (obj.position.getX() == x && obj.position.getY() == y) {
                    obj.setType(type)
                    if (type == TileType.Hole) {
                        this.getRoom().setModelMatrixElement(x, y, 0)
                    }
                }
            }
        })        
    }

    public getTileByColor(color: ColorRGB) : Tile | undefined {
        return this.getMapObjects().find((obj) => {
            if (obj instanceof Tile) {
                if (obj.getColor().equals(color)) {
                    return obj
                }
            }
        }) as Tile
    }

    public getTilebyPosition(point: Point): Tile | undefined {
        return this.getMapObjects().find((obj) => {
            if (obj instanceof Tile) {
                if (obj.position.getX() === point.getX() && obj.position.getY() === point.getY()) {
                    return obj
                }
            }
        }) as Tile
    }

    public getTileByName(name : string) : Tile | undefined {
        return this.getMapObjects().find((obj) => {
            if (obj instanceof Tile) {
                if (obj.id === name) {
                    return obj
                }
            }
        }) as Tile
    }

    public getTiles() : Array<Tile> {
        return this.getMapObjects() as Array<Tile>
    }


}