import RoomObjectLogic from "../RoomObjectLogic";
import Entity from "./Entity";
import IEntityLogic from "./IEntityLogic";

export default abstract class EntityLogic extends RoomObjectLogic {

    protected entity: Entity;

    public constructor(entity: Entity) {
        super();

        this.entity = entity;
    }

    public get Entity(): Entity { return this.entity; }
}