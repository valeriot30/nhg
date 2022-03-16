import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import { ActionId } from "../../../../../engine/ui/imagers/avatars/Avatar";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";

export default class UpdateStatus extends MessageHandler  {
    public handle(): void {

        let status = this.message;

        let currentUser = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser("" + status.id);
        let userV = currentUser!.Visualization as UserVisualization;

        if(status.lay === false && status.walk === false && status.wave === false && status.lay === false && status.sit === false) {
            userV.updateAction(ActionId.STAND);
            userV.draw();
            userV.NeedsUpdate = false;
            userV.IsWalking = false;
        }

    }
}