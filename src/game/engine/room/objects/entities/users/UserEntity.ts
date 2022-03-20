import Entity from "../../../../../core/room/object/entities/Entity";
import IRoomEntityVisualization from "../../../../../core/room/object/entities/Entity";
import Room from "../../../Room";
import UserEntityLogic from "./logic/UserEntityLogic";
import UserEntityVisualization from "./visualization/UserEntityVisualization";

export default class UserEntity extends Entity {

    private look: string;

    public constructor(id: string, name: string, look: string, room: Room) {
        super(id, name, room);

        this.look = look;

        this.setVisualization(new UserEntityVisualization(this));
        this.setLogic(new UserEntityLogic(this))
    }

    public get Look(): string { return this.look }
    public set Look(look: string) { this.look = look; }
}