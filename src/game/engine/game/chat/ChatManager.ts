import Engine from "../../../Engine";
import { ActionId } from "../../ui/imagers/avatars/Avatar";
import UserVisualization from "../../user/visualization/UserVisualization";
import ChatMessage from "./ChatMessage";

export default class ChatManager {

    constructor() {

    }

    public computeMessage(message: string, shout: boolean = false, authorName: string) {
        let userVisualization = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUserFromUserName(authorName)?.Visualization as UserVisualization;
        

    }
}