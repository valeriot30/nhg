
import Point from "../../../../utils/point/Point"
import Point3d from "../../../../utils/point/Point3d"
import Tile from "./Tile"
import TileType from "./TileTypeEnum"
export default class MapTypeChecker {

    public static checkTileType(position: Point3d, doorPosition: Point, modelMatrix: Array<Array<number>>) : TileType {

       // console.log(position);

        if (doorPosition.getY() == position.getY() && doorPosition.getX() == position.getX() && modelMatrix[position.getX()][position.getY()] == 0) {
            console.log("type door")
            return TileType.DoorTile
        } else if (modelMatrix[position.getX()][position.getY()] == 0) {
            return TileType.Hole
        } else if (
            modelMatrix[position.getX() - 1] &&
            modelMatrix[position.getX() - 1][position.getY()] != 0 &&
            modelMatrix[position.getX()][position.getY()] + 1 == modelMatrix[position.getX() - 1][position.getY()]
        ) {
            return TileType.StairRight
        } else if (
            modelMatrix[position.getX()] &&
            modelMatrix[position.getX()][position.getY() - 1] != 0 &&
            modelMatrix[position.getX()][position.getY()] + 1 == modelMatrix[position.getX()][position.getY() - 1]
        ) {
            return TileType.StairLeft
        } else if (
            modelMatrix[position.getX() - 1] &&
            modelMatrix[position.getX() - 1][position.getY() - 1] &&
            modelMatrix[position.getX() - 1][position.getY() - 1] != 0 &&
            (modelMatrix[position.getX() - 1][position.getY()] == 0 ||
                modelMatrix[position.getX() - 1][position.getY()] <= modelMatrix[position.getX()][position.getY()]) &&
            modelMatrix[position.getX()][position.getY()] + 1 == modelMatrix[position.getX() - 1][position.getY() - 1]
        ) {
            return TileType.StairCornerFront
        } else if (
            modelMatrix[position.getX() - 1] &&
            modelMatrix[position.getX() - 1][position.getY() + 1] &&
            modelMatrix[position.getX() - 1][position.getY() + 1] != 0 &&
            (modelMatrix[position.getX() - 1][position.getY()] == 0 ||
                modelMatrix[position.getX() - 1][position.getY()] <= modelMatrix[position.getX()][position.getY()]) &&
            modelMatrix[position.getX()][position.getY()] + 1 == modelMatrix[position.getX() - 1][position.getY() + 1]
        ) {
            return TileType.StairCornerLeft
        } else if (
            modelMatrix[position.getX() + 1] &&
            modelMatrix[position.getX() + 1][position.getY() - 1] &&
            modelMatrix[position.getX() + 1][position.getY() - 1] != 0 &&
            (modelMatrix[position.getX() + 1][position.getY()] == 0 ||
                modelMatrix[position.getX() + 1][position.getY()] <= modelMatrix[position.getX()][position.getY()]) &&
            modelMatrix[position.getX()][position.getY()] + 1 == modelMatrix[position.getX() + 1][position.getY() - 1]
        ) {
            return TileType.StairCornerRight
        } 
        
        return TileType.Flat
    }

    public static checkWallCorner(x: number, y: number, modelMatrix: Array<Array<number>>) {
        let i;
        let isCorner =
            (x == 0 && y == 0) ||
            (modelMatrix[x - 1] &&
                modelMatrix[x][y - 1] &&
                modelMatrix[x - 1][y] == 0 &&
                modelMatrix[x][y - 1] == 0) ?
            true :
            false;

        for (i = x - 1; i > 0; i--)
            if (modelMatrix[i][y] && modelMatrix[i][y] != 0 && isCorner)
                isCorner = false;

        for (i = y - 1; i > 0; i--)
            if (modelMatrix[x][i] && modelMatrix[x][i] != 0 && isCorner)
                isCorner = false;

        return isCorner;

        
    }
    

}