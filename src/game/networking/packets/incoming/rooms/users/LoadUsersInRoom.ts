import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import User from "../../../../../engine/user/User";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";


export default class LoadUsersInRoom extends MessageHandler
{
    public handle(): void {
        for(let i = 1; i <= this.message.count; i++)
        {
            if(parseInt(this.message.users['User-'+i]['id']) !== Engine.getInstance().UsersManager?.CurrentUser?.UserInfo.Id) {
                let tmpUser = new User(this.message.users['User-'+i]['id'], this.message.users['User-'+i]['name'], this.message.users['User-'+i]['look'], this.message.users['User-'+i]['gender']); 
                let userV = (tmpUser.Visualization) as UserVisualization
                userV.X = this.message.users['User-'+i]['x']
                userV.Y = this.message.users['User-'+i]['y']
                userV.Z = this.message.users['User-'+i]['z']
                userV.Rot = userV.parseRotation(this.message.users['User-'+i]['rot'])
                //todo headRot
                userV.HeadRot = userV.parseRotation(this.message.users['User-'+i]['rot'])
                userV.InRoom = true;

                Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.addUser(tmpUser)
                userV.render();
            }

            //tmpUser.moveTo(tmpUser.x, tmpUser.y, tmpUser.z, tmpUser.rot, true)
       }
    }
}
