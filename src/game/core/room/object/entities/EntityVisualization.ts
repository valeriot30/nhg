import RoomObjectVisualization from "../RoomObjectVisualization";
import Entity from "./Entity";
import IEntity from "./IEntity";

export default abstract class EntityVisualization extends RoomObjectVisualization {

    protected entity: Entity;

    public constructor(entity: Entity) {
        super(0, 0, 0);

        this.entity = entity;
    }

    abstract render(): void

    public get Entity(): IEntity { return this.entity; }
}