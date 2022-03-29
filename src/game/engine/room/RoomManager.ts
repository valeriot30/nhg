import IRoomManager from "../../core/room/IRoomManager";
import Engine from "../../Engine";
import Room from "./Room";
import Point from "../../utils/point/Point";
import UIComponent from "../ui/components/UIComponentEnum";
import RoomUI from "../ui/components/room/RoomUI";
import StaticContainerUI from "../ui/components/static/StaticContainerUI";
import RoomVisualization from "./visualization/RoomVisualization";

export default class RoomManager implements IRoomManager {

    private engine: Engine

    private currentRoom: Room | null = null

    private roomUI: RoomUI


    constructor(engine: Engine) {
        this.engine = engine
        this.roomUI = Engine.getInstance().userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.RoomUI) as RoomUI
    }   


    public setRoom(roomName: string, roomModel: string, doorPosition: Point, roomId: number) : Room {
        this.currentRoom = new Room(roomName, roomModel, doorPosition, roomId);
        this.currentRoom.getRoomLayout().Visualization.render();
        this.currentRoom.getRoomLayout().Logic.registerEvents()
        this.showUI();
        return this.currentRoom;
    }

    public showUI() {
        let container = (Engine.getInstance().userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.StaticContainerUI) as StaticContainerUI);
        container.StaticContainer.$data.isChatBarVisible = true;
    }

    public unsetRoom() : void {
        //this.roomUI.hide()
        (this.currentRoom?.getRoomLayout().Visualization as RoomVisualization).Container.destroy();
        this.currentRoom = null
    }
    

    public tick(delta: number) : void {
        this.currentRoom?.getRoomLayout().Logic.tick(delta)
        this.CurrentRoom?.RoomUsersManager.tick(delta)
        this.currentRoom?.RoomEntityManager.tick(delta);
    }


    public get CurrentRoom() : Room | null {
        return this.currentRoom;
    }

    public get RoomUI() : RoomUI {
        return this.roomUI;
    }


}