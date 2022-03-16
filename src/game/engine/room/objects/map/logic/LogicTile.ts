import Tile from "../Tile"
import RoomLogic from "../../../logic/RoomLogic"
import RoomObjectLogic from "../../../../../core/room/object/RoomObjectLogic"
import MapData from "../MapData"
import TileType from "../TileTypeEnum"
import VisualizationTile from "../visualization/VisualizationTile"
import { DisplayObject } from "pixi.js"

export default class LogicTile extends RoomObjectLogic {

    private tile: Tile
    private hitContext: CanvasRenderingContext2D | null

    constructor(tile: Tile) {
        super()

        this.tile = tile

        let canvas = (this.tile.getPlane().getRoom().getLogic() as RoomLogic).getCanvasFloorHit()
        this.hitContext = canvas.getContext("2d")

        this.checkTileAndDrawHitBox()
    }

    public registerEvents() {
        let tileVisualization = this.tile.getVisualization() as VisualizationTile;

        //console.log(tileVisualization.TileContext);
    }

    public checkTileAndDrawHitBox() {
        if (this.tile.getType() != TileType.Hole) {
            if (this.hitContext != null) {
                this.drawTileHitBox(this.hitContext)
            }
        }
    }

    private drawTileHitBox(hitCtx: CanvasRenderingContext2D) : CanvasRenderingContext2D {

        hitCtx.save();

        hitCtx.beginPath();
        hitCtx.moveTo(
            this.tile.getVisualization()!.getOffsetX() + MapData.tileWidth / 2,
            this.tile.getVisualization()!.getOffsetY()
        );
        hitCtx.lineTo(
            this.tile.getVisualization()!.getOffsetX() + MapData.tileWidth,
            this.tile.getVisualization()!.getOffsetY() + MapData.tileHeight / 2
        );
        hitCtx.lineTo(this.tile.getVisualization()!.getOffsetX() + MapData.tileWidth / 2, this.tile.getVisualization()!.getOffsetY() + MapData.tileHeight);
        hitCtx.lineTo(this.tile.getVisualization()!.getOffsetX(), this.tile.getVisualization()!.getOffsetY() + MapData.tileHeight / 2);
        hitCtx.closePath();
        hitCtx.fillStyle = this.tile.getColor().toString();
        hitCtx.fill();

        hitCtx.restore();

        return hitCtx;
    }
    
    tick(delta: number) : void {}

}