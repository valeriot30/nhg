import Point from '../../utils/point/Point'
import RoomLayout from "./RoomLayout"
import RoomInfo from "./RoomInfo"
import RoomItemManager from './RoomItemManager';
import RoomUserManager from './RoomUserManager';
import RoomEntityManager from './RoomEntityManager';

export default class Room {

    private roomLayout: RoomLayout;
    private roomInfo: RoomInfo;

    private roomItemManager: RoomItemManager
    private roomUsersManager: RoomUserManager
    private roomEntityManager: RoomEntityManager

    private roomName: string;

    private roomId: number;


    constructor(roomName: string, roomModel: string, doorPosition: Point, roomId: number) {
        this.roomName = roomName;
        this.roomId = roomId;
        this.roomLayout = new RoomLayout(this, roomModel, doorPosition);
        this.roomUsersManager = new RoomUserManager();
        this.roomEntityManager = new RoomEntityManager();
        this.roomItemManager = new RoomItemManager();
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

    public get RoomEntityManager(): RoomEntityManager {
        return this.roomEntityManager;
    }

    public get RoomItemManager(): RoomItemManager {
        return this.roomItemManager
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