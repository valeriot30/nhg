import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import User from "../../../../../engine/user/User";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";


export default class LoadUsersInRoom extends MessageHandler
{
    public handle(): void {
        for(let i = 0; i < this.message.users.length; i++)
        {
            let userData = this.message.users[i];
            
            let tmpUser = new User(userData['id'], userData['name'], userData['look'], userData['gender']); 
            let userV = (tmpUser.Visualization) as UserVisualization
            userV.X = userData['x']
            userV.Y = userData['y']
            userV.Z = userData['z']
            userV.Rot = userV.parseRotation(userData['rot'])
            //todo headRot
            userV.HeadRot = userV.parseRotation(userData['rot'])
            tmpUser.UserInfo!.Look = userData['look'];
            tmpUser.UserInfo!.Gender = userData['gender'];
            userV.InRoom = true;

            Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.addUser(tmpUser)
            userV.render();
            
       }
    }
}
