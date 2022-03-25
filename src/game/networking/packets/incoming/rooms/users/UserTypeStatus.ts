import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import { MessageType } from "../../../../../core/game/chat/MessageType";
import Engine from "../../../../../Engine";
import ChatMessage from "../../../../../engine/game/chat/ChatMessage";
import UserEntityLogic from "../../../../../engine/room/objects/entities/users/logic/UserEntityLogic";
import UserEntity from "../../../../../engine/room/objects/entities/users/UserEntity";
import UserEntityVisualization from "../../../../../engine/room/objects/entities/users/visualization/UserEntityVisualization";
import RoomUI from "../../../../../engine/ui/components/room/RoomUI";
import UIComponent from "../../../../../engine/ui/components/UIComponentEnum";
import User from "../../../../../engine/user/User";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";


export default class UserTypeStatus extends MessageHandler {
    public handle(): void {

        let data = this.message;

        let user: User | undefined = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(data.id)

        if(!user) {
            return;
        }

        ((user.Visualization as UserVisualization).UserEntity?.getLogic() as UserEntityLogic).userToggleTyping(data.typing)
    }
}