import { Point } from "pixi.js";
import { IEntityData } from "../../../../../core/communication/messages/incoming/rooms/entities/IEntityData";
import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Entity from "../../../../../core/room/object/entities/Entity";
import EntityVisualization from "../../../../../core/room/object/entities/EntityVisualization";
import Engine from "../../../../../Engine";
import UserEntityVisualization from "../../../../../engine/room/objects/entities/users/visualization/UserEntityVisualization";
import { ActionId } from "../../../../../engine/ui/imagers/avatars/Avatar";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";
import Point3d from "../../../../../utils/point/Point3d";

export default class UpdateEntity extends MessageHandler {
    public handle(): void {

        let entityData: IEntityData = this.message;

        // check, it's teleport?

        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            
            let isUser = entityData.user_id != undefined;
            let entity: Entity | null = null;
            let entityVisualization: EntityVisualization | null = null;

            if(isUser) {
                entity = ((Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(entityData.user_id)?.visualization as UserVisualization).UserEntity);
                entityVisualization = entity?.visualization as UserEntityVisualization
                (entityVisualization as UserEntityVisualization).setPosition(new Point3d(entityData.x, entityData.y, entityData.z))

                if (entityData.actions.length == 0) {
                    (entityVisualization as UserEntityVisualization).addAction(ActionId.STAND)
                    return;
                }
                
                for(let action of entityData.actions) {
                    action as ActionId
                    (entityVisualization as UserEntityVisualization).addAction(action);      
                }

                    
                (entityVisualization as UserEntityVisualization).NeedsUpdate = true
            }
        }
    }
}