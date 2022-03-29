export default class RoomInfo {
    
    private roomName: string;
    public description: string | null
    public maxUsers: number | null
    public canWalkThrough: boolean | null

    constructor(roomName: string, description: string | null = null, 
        maxUsers: number | null = null, canWalkThrough: boolean | null = null) {

        this.roomName = roomName;
        this.description = description
        this.maxUsers = maxUsers
        this.canWalkThrough = canWalkThrough
    }
}