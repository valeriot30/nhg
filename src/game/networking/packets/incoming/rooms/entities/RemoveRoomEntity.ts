import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import UserEntityVisualization from "../../../../../engine/room/objects/entities/users/visualization/UserEntityVisualization";
import User from "../../../../../engine/user/User";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";

export default class RemoveRoomEntity extends MessageHandler {
    public handle(): void {
        let entity = this.message.data;
        
        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            let roomEntityManager = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager;
            (roomEntityManager?.getEntity(entity.id)?.getVisualization() as UserEntityVisualization).Avatar?.Container.destroy();
            roomEntityManager?.removeEntity(entity.id);
        }
    }
}