import IRoomManager from "../../core/room/IRoomManager";
import Entity from "../../core/room/object/entities/Entity";
import IRoomEntity from "../../core/room/object/entities/IEntity";
import UserLogic from "../user/logic/UserLogic";
import UserEntity from "./objects/entities/users/UserEntity";

export default class RoomEntity implements IRoomManager {

    private entities: Map<string, Entity> = new Map()

    public addEntity(entity: Entity) : void {
        this.entities.set(entity.getId(), entity)
    }

    public removeEntity(userid: string) : void {
        let entity: IRoomEntity | undefined = this.entities.get(userid);
        //(entity?.Visualization as EntityVisualization).Avatar?.Container.destroy();
        this.entities.delete(userid)
    }

    public getUserFromUserName(userName: string): UserEntity | undefined {
        
        return undefined;
    }

    public getEntity(userid: string): Entity | undefined {
        return this.entities.get(userid);
    }

    public getEntities() : Map<string, Entity > {
        return this.entities
    }

    public tick(delta: number) {
        this.entities.forEach((entity: Entity) => {
            (entity.getLogic() as UserLogic).tick(delta);
        })
    }



}