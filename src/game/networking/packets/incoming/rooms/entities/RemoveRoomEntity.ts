import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import EntityVisualization from "../../../../../core/room/object/entities/EntityVisualization";
import Engine from "../../../../../Engine";
import UserEntityVisualization from "../../../../../engine/room/objects/entities/users/visualization/UserEntityVisualization";
import User from "../../../../../engine/user/User";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";

export default class RemoveRoomEntity extends MessageHandler {
    public handle(): void {
        let entityData = this.message;

        
        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            let roomEntityManager = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager;
            

            if(entityData.user_id) {
                let user: User | undefined = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(entityData.user_id);
                ((user?.visualization as UserVisualization).UserEntity?.visualization as UserEntityVisualization).Avatar?.Container.destroy()
                Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.deleteUser(entityData.user_id)
            }

            roomEntityManager?.removeEntity(entityData.id);
        }
    }
}