import { Point } from "pixi.js";
import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import { ActionId } from "../../../../../engine/ui/imagers/avatars/Avatar";
import UserLogic from "../../../../../engine/user/logic/UserLogic";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";
import Point3d from "../../../../../utils/point/Point3d";

export default class UpdateEntity extends MessageHandler {
    public handle(): void {

        let entity = this.message;

        // check, it's teleport?

        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            let userVisualization = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(parseInt(entity.id))?.Visualization as UserVisualization;
            userVisualization.setPosition(new Point3d(entity.x, entity.y, entity.z))
        
            for(let action of entity.actions) {
                
                if(action == "Default") {
                    userVisualization.NeedsUpdate = false;
                    return;
                }

                action as ActionId
                userVisualization.updateAction(action);      
            }
            userVisualization.NeedsUpdate = true;
        }
    }
}