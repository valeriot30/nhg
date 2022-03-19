import IRoomEntityVisualization from "../../../../../../core/room/object/entities/IEntityVisualization";
import RoomEntityVisualization from "../../../../../../core/room/object/entities/EntityVisualization";
import Entity from "../../../../../../core/room/object/entities/Entity";

export default class UserEntityVisualization extends RoomEntityVisualization {
    public constructor(entity: Entity) {
        super(entity);
    }
    render(): void {
        throw new Error("Method not implemented.");
    }
    
}