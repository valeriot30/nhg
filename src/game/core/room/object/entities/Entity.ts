import Room from "../../../../engine/room/Room";
import User from "../../../../engine/user/User";
import Point3d from "../../../../utils/point/Point3d";
import IRoomLogic from "../../IRoomLogic";
import IRoomObjectVisualization from "../IRoomObjectVisualization";
import RoomObjectController from "../RoomObjectController";
import RoomObjectLogic from "../RoomObjectLogic";
import IRoomEntity from "./IEntity";
import IRoomEntityLogic from "./IEntityLogic";
import IRoomEntityVisualization from "./IEntityVisualization";

export default abstract class Entity extends RoomObjectController implements IRoomEntity {
    protected name: string;
    protected room: Room;

    public constructor(id: string, name: string, room: Room) {
        super(id, new Point3d(0, 0, 0), null, null)

        this.name = name
        this.room = room;
    }

    public get Name(): string { return this.name; }
    public get Room(): Room | null { return this.room; }
} 