import Room from "../Room"
import RoomVisualization from "../visualization/RoomVisualization"
import IRoomLogic from "../../../core/room/IRoomLogic"
import ColorRGB from "../../../utils/color/ColorRGB"
import TileType from "../objects/map/TileTypeEnum"
import Tile from "../objects/map/Tile"
import Point from "../../../utils/point/Point"
import LogicPointer from "../objects/map/logic/LogicPointer"
import ScreenUtils from "../../../utils/ScreenUtils"
import Engine from "../../../Engine"
import UIComponent from "../../ui/components/UIComponentEnum"
import RoomUI from "../../ui/components/room/RoomUI"
import RoomLayout from "../RoomLayout"
import UserVisualization from "../../user/visualization/UserVisualization"
import { OutgoingPacket } from "../../../networking/packets/outgoing/OutgoingPacketEnum"

class RoomLogic implements IRoomLogic {

    private room: RoomLayout

    private canvasFloorHit: HTMLCanvasElement
    private canvasWallHit: HTMLCanvasElement


    constructor(room: RoomLayout) {
        this.room = room

        this.canvasFloorHit = this.room.createOrGetRoomCanvas("floorHit")
        this.canvasWallHit = this.room.createOrGetRoomCanvas("wallHit")

        if (Engine.getInstance().getConfig().debug && Engine.getInstance().getConfig().debugRoomClick) {
            let roomUIElement = (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.RoomUI) as RoomUI).getCanvasContainer()
            roomUIElement!.appendChild(this.canvasFloorHit)
        }

        this.registerEvents()
    }

    public registerEvents() : void {
        let roomVisualization = (this.room.getVisualization() as RoomVisualization);
        let currentUser = Engine.getInstance().UsersManager?.CurrentUser;
        let avatarV = currentUser?.Visualization as UserVisualization

        roomVisualization.Container.on("user-walk", this.onClickFloor.bind(this));
    }

    private onClickFloor(e: any) {
        let tile = this.room.getFloorPlane().getTilebyPosition(new Point(e.x, e.y));
        if (tile && tile.getType() != TileType.Hole) {                   
            if(Engine.getInstance().UsersManager?.CurrentUser) {
                Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.UserMove, {
                    x: e.x,
                    y: e.y
                })
            }
        }
    }

    private onMouseOver() {
        
    }

    private onMouseMoveFloor() {
        let tile = this.getTileByEvent()

        let pointerLogic = (this.room.getPointer().getLogic() as LogicPointer)
        
        if (tile && tile.getType() != TileType.Hole) {
            if (tile.getColor() != pointerLogic.getCurrentColor()) {
                pointerLogic.movePointer(new Point(tile.getVisualization()!.getOffsetX(), tile.getVisualization()!.getOffsetY()),  tile.getVisualization()!.getZIndex(), tile.getColor())
            }
        }
    }

    private getTileByEvent() : Tile | undefined {

        if (event == undefined) return

        let floorHitCtx = this.canvasFloorHit.getContext("2d")

        if (floorHitCtx == null) return
        
        let coords = ScreenUtils.getPosition(event, (this.room.getVisualization() as RoomVisualization).getCanvasFloor().name);

        if (coords == null || coords.x == null || coords.y == null) return

        let pixel = floorHitCtx.getImageData(
            coords.x / this.room.getZoom(),
            coords.y / this.room.getZoom(),
            1,
            1
        ).data;
        
        let color = new ColorRGB(pixel[0], pixel[1], pixel[2])
        return this.room.getFloorPlane().getTileByColor(color)
    }

    public tick(delta: number) : void {
        
        this.room.getWallPlane().getLogic()?.tick(delta)
        this.room.getFloorPlane().getLogic()?.tick(delta)
    }

    public getCanvasFloorHit() : HTMLCanvasElement {
        return this.canvasFloorHit
    }

    public getCanvasWallHit() : HTMLCanvasElement {
        return this.canvasWallHit
    }
}

export default RoomLogic