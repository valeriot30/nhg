import { Point } from "pixi.js";
import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import UserEntityVisualization from "../../../../../engine/room/objects/entities/users/visualization/UserEntityVisualization";
import { ActionId } from "../../../../../engine/ui/imagers/avatars/Avatar";
import UserLogic from "../../../../../engine/user/logic/UserLogic";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";
import Point3d from "../../../../../utils/point/Point3d";

export default class UpdateEntity extends MessageHandler {
    public handle(): void {

        let entity = this.message;

        // check, it's teleport?

        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            let entityVisualization = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.getEntity(entity.id)?.getVisualization() as UserEntityVisualization
            entityVisualization.setPosition(new Point3d(entity.x, entity.y, entity.z))
        
            if (entity.actions.length == 0) {
                entityVisualization.addAction(ActionId.STAND)
                return;
            }
            
            for(let action of entity.actions) {
                action as ActionId
                entityVisualization.addAction(action);      
            }
            entityVisualization.NeedsUpdate = true;
        }
    }
}