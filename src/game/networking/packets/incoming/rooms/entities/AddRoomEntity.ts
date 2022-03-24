import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Entity from "../../../../../core/room/object/entities/Entity";
import Engine from "../../../../../Engine";
import UserEntity from "../../../../../engine/room/objects/entities/users/UserEntity";
import UserEntityVisualization from "../../../../../engine/room/objects/entities/users/visualization/UserEntityVisualization";
import User from "../../../../../engine/user/User";
import UserInfo from "../../../../../engine/user/UserInfo";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";

export default class AddRoomEntity extends MessageHandler {
    public handle(): void {
        let entity = this.message;

        let tmpUser = new UserEntity(entity.id, entity.name, entity.look, entity.gender );
        let tmpVisualization =  (tmpUser?.getVisualization()) as UserEntityVisualization;
        tmpVisualization!.X = entity.x;
        tmpVisualization!.Y = entity.y;
        tmpVisualization!.Z = entity.z;

        tmpVisualization!.NextX = entity.nextx;
        tmpVisualization!.NextY = entity.nexty;
        tmpVisualization!.NextZ = entity.nextz;

        tmpVisualization!.Rot = tmpVisualization!.parseRotation(entity.rot)
        tmpVisualization!.HeadRot = tmpVisualization!.parseRotation(entity.rot)
        tmpUser.Look = entity.look;
        //tmpUser.!.Gender = user.gender;
        tmpVisualization!.InRoom = true;


        Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.addEntity(tmpUser);
        tmpVisualization?.render();

    }
}