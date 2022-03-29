import Engine from "../../../Engine";
import Room from "../../room/Room";
import RoomVisualization from "../../room/visualization/RoomVisualization";
import ListUI from "../../ui/components/general/ListUI";
import UIComponent from "../../ui/components/UIComponentEnum";
import User from "../../user/User";
import Command from "./Command";

export default class ChooserCommand extends Command{
    public ChooserCommand() {

    }

    public handle(args: string[]): void {

        let currentRoom = Engine.getInstance().RoomsManager!.CurrentRoom;
        
        let list = Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.ListUI) as ListUI

        if(Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUsers() == undefined) {
            return;
        }

        for(let user of Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUsers().values()!) {
            list.add(user.userInfo.username!);
        }
        list.toggle()
    }
}