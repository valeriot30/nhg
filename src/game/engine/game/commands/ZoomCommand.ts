import Engine from "../../../Engine";
import Room from "../../room/Room";
import RoomVisualization from "../../room/visualization/RoomVisualization";
import Command from "./Command";

export default class ZoomCommand extends Command{
    public ZoomCommand() {

    }

    public handle(args: string[]): void {
        let zoom = parseInt(args[0]);

            let currentRoom = Engine.getInstance().RoomsManager!.CurrentRoom;
            
            if(zoom < 0) {
                return;
            }

            (currentRoom!.getRoomLayout().Visualization as RoomVisualization).Container.scale.x = +zoom;
                (currentRoom!.getRoomLayout().Visualization as RoomVisualization).Container.scale.y = +zoom;
    }
}