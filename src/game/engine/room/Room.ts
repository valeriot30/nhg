import Point from '../../utils/point/Point'
import RoomLayout from "./RoomLayout"
import RoomInfo from "./RoomInfo"
import Engine from "../../Engine"
import RoomItemManager from './RoomItemManager';
import RoomUserManager from './RoomUserManager';

export default class Room {

    private roomLayout: RoomLayout;
    private roomInfo: RoomInfo;

    private roomItemManager: RoomItemManager
    private roomUsersManager: RoomUserManager

    private roomName: string;

    private roomId: number;


    constructor(roomName: string, roomModel: string, doorPosition: Point, roomId: number) {
        this.roomName = roomName;
        this.roomId = roomId;
        this.roomLayout = new RoomLayout(this, roomModel, doorPosition);
        this.roomUsersManager = new RoomUserManager();
        this.roomItemManager = new RoomItemManager()
        this.roomInfo = new RoomInfo(roomName);

    }

    public getRoomLayout(): RoomLayout {
        return this.roomLayout;
    }
    public getRoomInfo(): RoomInfo {
        return this.roomInfo;
    }
    public getRoomId(): number {
        return this.roomId;
    }

    public get Name(): string {
        return this.roomName;
    }
    public get Id(): number {
        return this.roomId;
    }
    public get RoomUsersManager(): RoomUserManager {
        return this.roomUsersManager;
    }
}