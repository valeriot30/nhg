import RoomVisualization from "../visualization/RoomVisualization"
import IRoomLogic from "../../../core/room/IRoomLogic"
import Engine from "../../../Engine"
import UIComponent from "../../ui/components/UIComponentEnum"
import RoomUI from "../../ui/components/room/RoomUI"
import RoomLayout from "../RoomLayout"

class RoomLogic implements IRoomLogic {

    private room: RoomLayout

    private canvasFloorHit: HTMLCanvasElement
    private canvasWallHit: HTMLCanvasElement


    constructor(room: RoomLayout) {
        this.room = room

        this.canvasFloorHit = this.room.createOrGetRoomCanvas("floorHit")
        this.canvasWallHit = this.room.createOrGetRoomCanvas("wallHit")

        if (Engine.getInstance().config.debug && Engine.getInstance().config.debugRoomClick) {
            let roomUIElement = (Engine.getInstance().userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.RoomUI) as RoomUI).getCanvasContainer()
            roomUIElement!.appendChild(this.canvasFloorHit)
        }
    }

    public registerEvents() : void {
        let roomVisualization = (this.room.Visualization as RoomVisualization);
        
        roomVisualization.getCanvasFloor().on('pointerover', this.onMouseOver.bind(this));
        roomVisualization.getCanvasFloor().on('pointerout', this.onMouseOut.bind(this));

        this.room.getFloorPlane().logic?.registerEvents()
        this.room.getWallPlane().logic?.registerEvents()
    }

    private onMouseOver(e: any) {
        (this.room.Visualization as RoomVisualization).getCanvasPointer().zIndex = 5;
        (this.room.Visualization as RoomVisualization).Container.sortChildren()
    }

    private onMouseOut(e: any) {
        (this.room.Visualization as RoomVisualization).getCanvasPointer().zIndex = 3;
        (this.room.Visualization as RoomVisualization).Container.sortChildren()
    }


    public tick(delta: number) : void {
        
        this.room.getWallPlane().logic?.tick(delta)
        this.room.getFloorPlane().logic?.tick(delta)
    }

    public getCanvasFloorHit() : HTMLCanvasElement {
        return this.canvasFloorHit
    }

    public getCanvasWallHit() : HTMLCanvasElement {
        return this.canvasWallHit
    }
}

export default RoomLogic