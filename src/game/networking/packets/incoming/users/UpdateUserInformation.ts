import MessageHandler from "../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../Engine";
import User from "../../../../engine/user/User";
import UserVisualization from "../../../../engine/user/visualization/UserVisualization";

export default class UpdateUserInformation extends MessageHandler {
    public handle(): void {

        let userInfo = this.message;

        if(Engine.getInstance().UsersManager?.CurrentUser) {
            Engine.getInstance().UsersManager!.CurrentUser!.UserInfo.Username = userInfo.username;
            Engine.getInstance().UsersManager!.CurrentUser!.UserInfo.Id = userInfo.id;
            Engine.getInstance().UsersManager!.CurrentUser!.UserInfo.Look = userInfo.look;
            Engine.getInstance().UsersManager!.CurrentUser!.UserInfo.Gender = userInfo.gender;
            Engine.getInstance().UsersManager!.CurrentUser!.UserInfo.Motto = userInfo.motto;
            //(Engine.getInstance().UsersManager?.CurrentUser?.Visualization as UserVisualization).render();

        } else {
            Engine.getInstance().UsersManager?.setUser(new User(userInfo.id, userInfo.username, userInfo.look, userInfo.gender))
        }
        
    }
}