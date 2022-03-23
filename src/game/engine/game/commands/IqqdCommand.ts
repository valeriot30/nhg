import Engine from "../../../Engine";
import Room from "../../room/Room";
import RoomVisualization from "../../room/visualization/RoomVisualization";
import Command from "./Command";

export default class IqqdCommand extends Command{
    public IqqdCommand() {

    }

    public handle(args: string[]): void {

            let currentRoom = Engine.getInstance().RoomsManager!.CurrentRoom;
            let RoomVisualization = (currentRoom!.getRoomLayout().Visualization as RoomVisualization)

            if(!currentRoom) {
                return;
            }

            RoomVisualization.Container.scale.y = -1;
    }
}