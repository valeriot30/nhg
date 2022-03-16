import RoomPlane from "./RoomPlane"
import RoomPlaneType from "./RoomPlaneTypeEnum"
import Room from "../../Room"
import Tile from "./Tile"
import ColorRGB from "../../../../utils/color/ColorRGB"
import TileType from "./TileTypeEnum"
import MapData from "./MapData"
import MapTypeChecker from "./MapTypeChecker"
import Point3d from "../../../../utils/point/Point3d"
import RoomLayout from "../../RoomLayout"
import { IPoint } from "pixi.js"
import Point from "../../../../utils/point/Point"

export default class FloorPlane extends RoomPlane {

    constructor(room: RoomLayout) {
        super(room, RoomPlaneType.Floor)
    }

    public prepareTiles() : void {
        this.getRoom().getModelMaltrix().forEach((xRow, x) => {
            xRow.forEach((_, y) => {

                let position = new Point3d(x, y, this.getRoom().getModelMaltrix()[x][y])

                if (position.getX() == this.getRoom().getDoorPosition().getX() && position.getY() == this.getRoom().getDoorPosition().getY())
                    this.getRoom().getModelMaltrix()[x][y] = 0

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
                if (obj.getPosition().getX() == x && obj.getPosition().getY() == y) {
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
                if (obj.getPosition().getX() === point.getX() && obj.getPosition().getY() === point.getY()) {
                    return obj
                }
            }
        }) as Tile
    }

    public getTileByName(name : string) : Tile | undefined {
        return this.getMapObjects().find((obj) => {
            if (obj instanceof Tile) {
                if (obj.getId() === name) {
                    return obj
                }
            }
        }) as Tile
    }

    public getTiles() : Array<Tile> {
        return this.getMapObjects() as Array<Tile>
    }


}