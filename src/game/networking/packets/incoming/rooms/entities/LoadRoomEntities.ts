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
            let entityData = this.message.data[i];
            
            if (Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(entityData['user_id']) == undefined) {
                
                let entity: Entity | null = null;
                let entityVisualization: EntityVisualization | null = null;
                
                if(entityData.type === EntityType.HUMAN) {
                    entity = new UserEntity((entityData['id']), entityData['name'], entityData['look'], entityData['gender']); 
                    entityVisualization = entity.getVisualization() as UserEntityVisualization
                    
                    (entityVisualization as UserEntityVisualization).X = entityData['x'];
                    (entityVisualization as UserEntityVisualization).Y = entityData['y'];
                    (entityVisualization as UserEntityVisualization).Z = entityData['z'];
                    (entityVisualization as UserEntityVisualization).Rot = (entityVisualization as UserEntityVisualization).parseRotation(entityData['rot']);
                    //todo headRot
                    (entityVisualization as UserEntityVisualization).HeadRot = (entityVisualization as UserEntityVisualization).parseRotation(entityData['rot']);
                    (entityVisualization as UserEntityVisualization).InRoom = true;

                    if(entityData.user_id !== undefined) {
                        let user;
                        if(Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(entityData.user_id) === undefined) {
                            user = new User(entityData, entityData.name, entityData.look, entityData.gender);
                            Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.addUser(user);
                        } else {
                            user = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(entityData.user_id)
                        }

                        (user?.Visualization as UserVisualization).UserEntity = entity as UserEntity
                    } 
                }

                if(entity && entityVisualization) {
                    Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.addEntity(entity)
                    entityVisualization.render();
                }

                (Engine.getInstance().RoomsManager?.CurrentRoom?.getRoomLayout().Visualization as RoomVisualization).Container.sortChildren()
            }
       }
    }
}
