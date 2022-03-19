import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import User from "../../../../../engine/user/User";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";

export default class RemoveRoomEntity extends MessageHandler {
    public handle(): void {
        let entity = this.message.data;
        
        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            let roomUsersManager = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager;
            (roomUsersManager?.getUser(entity.id)?.Visualization as UserVisualization).Avatar?.Container.destroy();
            roomUsersManager?.removeUser(entity.id);
        }
    }
}