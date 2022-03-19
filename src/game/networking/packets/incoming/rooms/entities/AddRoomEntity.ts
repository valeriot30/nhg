import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import User from "../../../../../engine/user/User";
import UserInfo from "../../../../../engine/user/UserInfo";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";

export default class AddRoomEntity extends MessageHandler {
    public handle(): void {
        let user = this.message;

        if ((Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(user.id)) != undefined) {
            return;
        }

        let tmpUser = new User(user.id, user.name, user.look, user.gender );
        let tmpVisualization =  (tmpUser?.Visualization) as UserVisualization;
        tmpVisualization!.X = user.x;
        tmpVisualization!.Y = user.y;
        tmpVisualization!.Z = user.z;

        tmpVisualization!.NextX = user.nextx;
        tmpVisualization!.NextY = user.nexty;
        tmpVisualization!.NextZ = user.nextz;

        tmpVisualization!.Rot = tmpVisualization!.parseRotation(user.rot)
        tmpVisualization!.HeadRot = tmpVisualization!.parseRotation(user.rot)
        tmpUser.UserInfo!.Look = user.look;
        tmpUser.UserInfo!.Gender = user.gender;
        tmpVisualization!.InRoom = true;


        Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.addUser(tmpUser);
        tmpVisualization?.render();

    }
}