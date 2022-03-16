import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";

export default class RemoveRoomUser extends MessageHandler {
    public handle(): void {
        let user = this.message;
        
        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            (Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(user.id)?.Visualization as UserVisualization).Avatar?.Container.destroy();
        }
    }
}