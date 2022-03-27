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

        if (Engine.getInstance().getConfig().debug && Engine.getInstance().getConfig().debugRoomClick) {
            let roomUIElement = (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.RoomUI) as RoomUI).getCanvasContainer()
            roomUIElement!.appendChild(this.canvasFloorHit)
        }
    }

    public registerEvents() : void {
        let roomVisualization = (this.room.Visualization as RoomVisualization);
        
        roomVisualization.getCanvasFloor().on('pointerover', this.onMouseOver.bind(this));
        roomVisualization.getCanvasFloor().on('pointerout', this.onMouseOut.bind(this));

        this.room.getFloorPlane().getLogic()?.registerEvents()
        this.room.getWallPlane().getLogic()?.registerEvents()
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