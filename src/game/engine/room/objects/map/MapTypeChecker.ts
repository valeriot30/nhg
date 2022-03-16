
import Point from "../../../../utils/point/Point"
import Point3d from "../../../../utils/point/Point3d"
import Tile from "./Tile"
import TileType from "./TileTypeEnum"
export default class MapTypeChecker {

    public static checkTileType(position: Point3d, doorPosition: Point, modelMatrix: Array<Array<string>>) : TileType {

       // console.log(position);

        if (doorPosition.getY() === position.getY() && doorPosition.getX() === position.getX()) {
            return TileType.DoorTile
        } else if (modelMatrix[position.getX()][position.getY()] == 'x') {
            return TileType.Hole
        } else if (
            modelMatrix[position.getX() - 1] &&
            modelMatrix[position.getX() - 1][position.getY()] != "x" &&
            parseInt(modelMatrix[position.getX()][position.getY()]) + 1 == parseInt(modelMatrix[position.getX() - 1][position.getY()])
        ) {
            return TileType.StairRight
        } else if (
            modelMatrix[position.getX()] &&
            modelMatrix[position.getX()][position.getY() - 1] != "x" &&
            parseInt(modelMatrix[position.getX()][position.getY()]) + 1 == parseInt(modelMatrix[position.getX()][position.getY() - 1])
        ) {
            return TileType.StairLeft
        } else if (
            modelMatrix[position.getX() - 1] &&
            modelMatrix[position.getX() - 1][position.getY() - 1] &&
            modelMatrix[position.getX() - 1][position.getY() - 1] != "x" &&
            (modelMatrix[position.getX() - 1][position.getY()] == "x" ||
                parseInt(modelMatrix[position.getX() - 1][position.getY()]) <= parseInt(modelMatrix[position.getX()][position.getY()])) &&
            parseInt(modelMatrix[position.getX()][position.getY()]) + 1 == parseInt(modelMatrix[position.getX() - 1][position.getY() - 1])
        ) {
            return TileType.StairCornerFront
        } else if (
            modelMatrix[position.getX() - 1] &&
            modelMatrix[position.getX() - 1][position.getY() + 1] &&
            modelMatrix[position.getX() - 1][position.getY() + 1] != "x" &&
            (modelMatrix[position.getX() - 1][position.getY()] == "x" ||
                parseInt(modelMatrix[position.getX() - 1][position.getY()]) <= parseInt(modelMatrix[position.getX()][position.getY()])) &&
            parseInt(modelMatrix[position.getX()][position.getY()]) + 1 == parseInt(modelMatrix[position.getX() - 1][position.getY() + 1])
        ) {
            return TileType.StairCornerLeft
        } else if (
            modelMatrix[position.getX() + 1] &&
            modelMatrix[position.getX() + 1][position.getY() - 1] &&
            modelMatrix[position.getX() + 1][position.getY() - 1] != "x" &&
            (modelMatrix[position.getX() + 1][position.getY()] == "x" ||
                parseInt(modelMatrix[position.getX() + 1][position.getY()]) <= parseInt(modelMatrix[position.getX()][position.getY()])) &&
            parseInt(modelMatrix[position.getX()][position.getY()]) + 1 == parseInt(modelMatrix[position.getX() + 1][position.getY() - 1])
        ) {
            return TileType.StairCornerRight
        } 
        
        return TileType.Flat
    }

    public static checkWallCorner(x: number, y: number, modelMatrix: Array<Array<string>>) {
        let i;
        let isCorner =
            (x == 0 && y == 0) ||
            (modelMatrix[x - 1] &&
                modelMatrix[x][y - 1] &&
                modelMatrix[x - 1][y] == "x" &&
                modelMatrix[x][y - 1] == "x") ?
            true :
            false;

        for (i = x - 1; i > 0; i--)
            if (modelMatrix[i][y] && modelMatrix[i][y] != 'x' && isCorner)
                isCorner = false;

        for (i = y - 1; i > 0; i--)
            if (modelMatrix[x][i] && modelMatrix[x][i] != 'x' && isCorner)
                isCorner = false;

        return isCorner;

        
    }
    

}