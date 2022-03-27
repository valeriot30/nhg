import { IEntityData } from "../../../../../core/communication/messages/incoming/rooms/entities/IEntityData";
import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Entity from "../../../../../core/room/object/entities/Entity";
import { EntityType } from "../../../../../core/room/object/entities/EntityType";
import EntityVisualization from "../../../../../core/room/object/entities/EntityVisualization";
import Engine from "../../../../../Engine";
import UserEntity from "../../../../../engine/room/objects/entities/users/UserEntity";
import UserEntityVisualization from "../../../../../engine/room/objects/entities/users/visualization/UserEntityVisualization";
import User from "../../../../../engine/user/User";
import UserInfo from "../../../../../engine/user/UserInfo";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";

export default class AddRoomEntity extends MessageHandler {
    public handle(): void {
        let entityData: IEntityData = this.message;

        let entity: Entity | null = null;
        let entityVisualization: EntityVisualization | null = null;

        if(Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.getEntity(entityData.id.toString()) !== undefined) {
            return;
        }

        if(entityData.type === EntityType.HUMAN && entityData.user_id != undefined) {
            entity = new UserEntity(entityData.id.toString(), entityData.name, entityData.look, Engine.getInstance().RoomsManager?.CurrentRoom!);
            entityVisualization =  (entity?.getVisualization()) as UserEntityVisualization;
            (entityVisualization as UserEntityVisualization).X = entityData.x;
            (entityVisualization as UserEntityVisualization).Y = entityData.y;
            (entityVisualization as UserEntityVisualization).Z = entityData.z;

            (entityVisualization as UserEntityVisualization).Rot = (entityVisualization as UserEntityVisualization).parseRotation(entityData.rot);
            (entityVisualization as UserEntityVisualization).HeadRot = (entityVisualization as UserEntityVisualization)!.parseRotation(entityData.rot);
            (entity as UserEntity).Look = entityData.look;
            //tmpUser.!.Gender = user.gender;
            (entityVisualization as UserEntityVisualization).InRoom = true;

            let user = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(entityData.user_id);

            if(!user) {
                user = new User(entityData.user_id, entityData.name, entityData.look, entityData.gender);
                Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.addUser(user);
                (user.Visualization as UserVisualization).UserEntity = entity as UserEntity;
            }
        }

        if(entity) {
            Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.addEntity(entity);
            entityVisualization?.render();
        }

    }
}