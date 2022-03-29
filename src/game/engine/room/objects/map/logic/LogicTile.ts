import Tile from "../Tile"
import RoomLogic from "../../../logic/RoomLogic"
import RoomObjectLogic from "../../../../../core/room/object/RoomObjectLogic"
import MapData from "../MapData"
import TileType from "../TileTypeEnum"
import VisualizationTile from "../visualization/VisualizationTile"
import Engine from "../../../../../Engine"
import { OutgoingPacket } from "../../../../../networking/packets/outgoing/OutgoingPacketEnum"
import VisualizationPointer from "../visualization/VisualizationPointer"

export default class LogicTile extends RoomObjectLogic {

    private tile: Tile
    private hitContext: CanvasRenderingContext2D | null

    constructor(tile: Tile) {
        super()

        this.tile = tile

        let canvas = (this.tile.getPlane().getRoom().Logic as RoomLogic).getCanvasFloorHit()
        this.hitContext = canvas.getContext("2d")

        this.checkTileAndDrawHitBox()
    }

    public registerEvents() {
        setTimeout(() => {          
            (this.tile.visualization as VisualizationTile).TileContext?.on('pointerdown', this.onTileClick.bind(this));
            (this.tile.visualization as VisualizationTile).TileContext?.on('pointerover', this.onTileHover.bind(this))
        }, 200);
    }

    private onTileClick(e: any) {
        Engine.getInstance().networkingManager?.getPacketManager().applyOut(OutgoingPacket.UserMove, {x: this.tile.position.getX(), y: this.tile.position.getY()})
    }

    private onTileHover(e: any) {
        let tileCtx: PIXI.Graphics | null = (this.tile.visualization as VisualizationTile).TileContext;
        (this.tile.getPlane().getRoom().getPointer().visualization as VisualizationPointer).updatePosition(tileCtx!.x, tileCtx!.y, this.tile);
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
            this.tile.visualization!.getOffsetX() + MapData.tileWidth / 2,
            this.tile.visualization!.getOffsetY()
        );
        hitCtx.lineTo(
            this.tile.visualization!.getOffsetX() + MapData.tileWidth,
            this.tile.visualization!.getOffsetY() + MapData.tileHeight / 2
        );
        hitCtx.lineTo(this.tile.visualization!.getOffsetX() + MapData.tileWidth / 2, this.tile.visualization!.getOffsetY() + MapData.tileHeight);
        hitCtx.lineTo(this.tile.visualization!.getOffsetX(), this.tile.visualization!.getOffsetY() + MapData.tileHeight / 2);
        hitCtx.closePath();
        hitCtx.fillStyle = this.tile.getColor().toString();
        hitCtx.fill();

        hitCtx.restore();

        return hitCtx;
    }
    
    tick(delta: number) : void {}

}