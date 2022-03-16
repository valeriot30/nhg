import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import User from "../../../../../engine/user/User";
import UserInfo from "../../../../../engine/user/UserInfo";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";

export default class NewRoomUser extends MessageHandler {
    public handle(): void {
        let user = this.message;
        let currentUser: User | undefined;
        let UserVisualization: UserVisualization | undefined;
        let userInfo: UserInfo;

        //console.log(Engine.getInstance().UsersManager?.CurrentUser?.UserInfo);
        
        if(user.id === Engine.getInstance().UsersManager?.CurrentUser?.UserInfo.getId()) {
            currentUser = Engine.getInstance().UsersManager?.CurrentUser!
            UserVisualization =  (currentUser?.Visualization) as UserVisualization;
            userInfo = currentUser?.UserInfo;

            UserVisualization.X = user.x;
            UserVisualization.Y = user.y;
            UserVisualization.Z = user.z;

            UserVisualization.NextX = user.nextx;
            UserVisualization.NextY = user.nexty;
            UserVisualization.NextZ = user.nextz;

            UserVisualization.Rot = UserVisualization.parseRotation(user.rot)
            UserVisualization.HeadRot = UserVisualization.parseRotation(user.rot)
            userInfo!.Look = user.look;
            userInfo!.Gender = user.gender;
            UserVisualization.InRoom = true;
            Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.addUser(currentUser);
            UserVisualization.render();
        } else {
            let tmp = new User(user.id, user.name, user.look, user.gender );
            let tmpVisualization =  (tmp?.Visualization) as UserVisualization;
            tmpVisualization!.X = user.x;
            tmpVisualization!.Y = user.y;
            tmpVisualization!.Z = user.z;

            tmpVisualization!.NextX = user.nextx;
            tmpVisualization!.NextY = user.nexty;
            tmpVisualization!.NextZ = user.nextz;

            tmpVisualization!.Rot = tmpVisualization!.parseRotation(user.rot)
            tmpVisualization!.HeadRot = tmpVisualization!.parseRotation(user.rot)
            tmp.UserInfo!.Look = user.look;
            tmp.UserInfo!.Gender = user.gender;
            tmpVisualization!.InRoom = true;


            Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.addUser(tmp);
            tmpVisualization?.render();

        }

    }
}