
export default class RoomInfo {
    
    private roomName: string;
    private description: string | null
    private maxUsers: number | null
    private allowWalkthrough: boolean | null

    constructor(roomName: string, description: string | null = null, 
        maxUsers: number | null = null, allowWalkthrough: boolean | null = null) {

        this.roomName = roomName;
        this.description = description
        this.maxUsers = maxUsers
        this.allowWalkthrough = allowWalkthrough
    }

    getRoomName(): string {
        return this.roomName;
    }

    public setName(name: string) {
        this.roomName = name
    }

    public setDescription(description: string) {
        this.description = description
    }

    public setMaxUsers(maxUsers: number) {
        this.maxUsers = maxUsers
    }

    public setAllowWalkthrough(allowWalkthrough: boolean) {
        this.allowWalkthrough = allowWalkthrough
    }

}