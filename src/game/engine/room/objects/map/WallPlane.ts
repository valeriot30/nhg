import RoomPlaneType from "./RoomPlaneTypeEnum";
import Room from "../../Room";
import RoomPlane from "./RoomPlane";
import MapTypeChecker from "./MapTypeChecker";
import WallType from "./WallTypeEnum";
import MapData from "./MapData";
import Point3d from "../../../../utils/point/Point3d";
import Wall from "./Wall";
import RoomLayout from "../../RoomLayout";

export default class WallPlane extends RoomPlane {

    constructor(room: RoomLayout, isRight: boolean = false) {
        super(room, isRight ? RoomPlaneType.RightWall : RoomPlaneType.LeftWall)
    }

    public prepareWalls() : void {
        let minY = this.getRoom().getModelMatrix()[0].length
        let minX = this.getRoom().getModelMatrix().length
        let isCorner = false
        let isDoor = false

        for (let x = 0; x < this.getRoom().getModelMatrix().length; x++) {
            for (let y = 0; y < this.getRoom().getModelMatrix()[x].length; y++) {

                
                isCorner = MapTypeChecker.checkWallCorner(x, y, this.getRoom().getModelMaltrix());

                isDoor = false
                if (x == this.getRoom().getDoorPosition().getX() && y - 1 == this.getRoom().getDoorPosition().getY()) {
                    isDoor = true
                }

                if (y <= minY && this.getRoom().getModelMatrix()[x][y] != "x") {
                    if (minY > y) {
                        minY = y;
                    }

                    
                    this.addMapObject(new Wall(
                        this,
                        `wall${ x }-${ y }`,
                        new Point3d(x, y, MapData.parseHeight(this.getRoom().getModelMatrix()[x][y])),
                        isDoor ? WallType.DoorLeft : WallType.Left,
                        isCorner,
                        this.getRoom().getUniqueColor()
                    )) 
                }
            }
        }

        for (let y = 0; y < this.getRoom().getModelMatrix()[0].length; y++) {
            for (let x = 0; x < this.getRoom().getModelMatrix().length; x++) {

                
                isCorner = MapTypeChecker.checkWallCorner(x, y, this.getRoom().getModelMatrix());

                isDoor = false
                if (x - 1 == this.getRoom().getDoorPosition().getX() && y == this.getRoom().getDoorPosition().getY()) {
                    isDoor = true
                }

                if (x <= minX && this.getRoom().getModelMatrix()[x][y] != "x") {
                    if (minX > x) {
                        minX = x;
                    }
                    

                    this.addMapObject(new Wall(
                        this,
                        `wall${ x }-${ y }`,
                        new Point3d(x, y, MapData.parseHeight(this.getRoom().getModelMatrix()[x][y])),
                        isDoor ? WallType.DoorRight : WallType.Right,
                        isCorner,
                        this.getRoom().getUniqueColor()
                    ))
                }
            }
        }
    }

    public getWalls() : Array<Wall> {
        return this.getMapObjects() as Array<Wall>
    }

}