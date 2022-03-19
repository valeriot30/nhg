import Entity from "../../../../../../core/room/object/entities/Entity";
import EntityLogic from "../../../../../../core/room/object/entities/EntityLogic";
import IEntityLogic from "../../../../../../core/room/object/entities/IEntityLogic";

export default class UserEntityLogic extends EntityLogic  {

    public constructor(entity: Entity) {
        super(entity)
    }

    tick(delta: number): void {
        
    }
}