import Entity from "../../../../../core/room/object/entities/Entity";
import IRoomEntityVisualization from "../../../../../core/room/object/entities/Entity";
import Room from "../../../Room";
import UserEntityLogic from "./logic/UserEntityLogic";
import UserEntityVisualization from "./visualization/UserEntityVisualization";

export default class UserEntity extends Entity {
    public constructor(id: string, name: string, room: Room) {
        super(id, name, room);

        this.setVisualization(new UserEntityVisualization(this));
        this.setLogic(new UserEntityLogic(this))
    }
}