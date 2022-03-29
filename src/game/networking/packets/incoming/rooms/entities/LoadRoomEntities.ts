import { IEntityData } from "../../../../../core/communication/messages/incoming/rooms/entities/IEntityData";
import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Entity from "../../../../../core/room/object/entities/Entity";
import { EntityType } from "../../../../../core/room/object/entities/EntityType";
import EntityVisualization from "../../../../../core/room/object/entities/EntityVisualization";
import IEntity from "../../../../../core/room/object/entities/IEntity";
import IEntityVisualization from "../../../../../core/room/object/entities/IEntityVisualization";
import Engine from "../../../../../Engine";
import UserEntity from "../../../../../engine/room/objects/entities/users/UserEntity";
import UserEntityVisualization from "../../../../../engine/room/objects/entities/users/visualization/UserEntityVisualization";
import RoomVisualization from "../../../../../engine/room/visualization/RoomVisualization";
import User from "../../../../../engine/user/User";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";


export default class LoadRoomEntities extends MessageHandler
{
    public handle(): void {
        for (let i = 0; i < this.message.data.length; i++)
        {
            let entityData: IEntityData = this.message.data[i];

            let entity: Entity | null = null;
            let entityVisualization: EntityVisualization | null = null;
            let user: User | undefined;

            let userId: number = entityData.user_id

            let isUser = userId !== undefined;

            if(Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.getEntity(entityData.id.toString()) !== undefined) {
                return;
            }
    

            if(entityData.type === EntityType.HUMAN && isUser) {

                entity = new UserEntity(entityData.id.toString(), entityData.name, entityData.look, Engine.getInstance().roomManager?.CurrentRoom!); 
                entityVisualization = entity.visualization as UserEntityVisualization
                    
                (entityVisualization as UserEntityVisualization).X = entityData.x;
                (entityVisualization as UserEntityVisualization).Y = entityData.y;
                (entityVisualization as UserEntityVisualization).Z = entityData.z;
                (entityVisualization as UserEntityVisualization).Rot = (entityVisualization as UserEntityVisualization).parseRotation(entityData.rot);
                    //todo headRot
                (entityVisualization as UserEntityVisualization).HeadRot = (entityVisualization as UserEntityVisualization).parseRotation(entityData.rot);
                (entityVisualization as UserEntityVisualization).InRoom = true;

                user = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(userId)

                if(!user) {
                    user = new User(userId, entityData.name, entityData.look, entityData.gender);
                    Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.addUser(user);
                    (user.visualization as UserVisualization).userEntity = entity as UserEntity;
                    (user.visualization as UserVisualization).userEntity?.visualization?.render()
                }
            }

            if(entity) {
                Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.addEntity(entity);
            }
    
       }
    }
}
