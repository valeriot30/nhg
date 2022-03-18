import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import User from "../../../../../engine/user/User";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";

export default class RemoveRoomUser extends MessageHandler {
    public handle(): void {
        let user= this.message;
        
        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            let roomUsersManager = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager;
            (roomUsersManager?.getUser(user.id)?.Visualization as UserVisualization).Avatar?.Container.destroy();
            roomUsersManager?.removeUser(user.id);
        }
    }
}