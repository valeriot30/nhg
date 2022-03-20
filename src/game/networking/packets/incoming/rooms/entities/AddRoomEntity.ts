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
        let user = this.message;

        let tmpUser = new UserEntity(user.id, user.name, user.look, user.gender );
        let tmpVisualization =  (tmpUser?.getVisualization()) as UserEntityVisualization;
        tmpVisualization!.X = user.x;
        tmpVisualization!.Y = user.y;
        tmpVisualization!.Z = user.z;

        tmpVisualization!.NextX = user.nextx;
        tmpVisualization!.NextY = user.nexty;
        tmpVisualization!.NextZ = user.nextz;

        tmpVisualization!.Rot = tmpVisualization!.parseRotation(user.rot)
        tmpVisualization!.HeadRot = tmpVisualization!.parseRotation(user.rot)
        tmpUser.Look = user.look;
        //tmpUser.!.Gender = user.gender;
        tmpVisualization!.InRoom = true;


        Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.addEntity(tmpUser);
        tmpVisualization?.render();

    }
}