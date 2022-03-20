import IRoomObjectVisualization from "./IRoomObjectVisualization"

export default abstract class RoomObjectVisualization implements IRoomObjectVisualization {

    protected offsetX: number
    protected offsetY: number
    protected zIndex: number

    protected needsUpdate: boolean = false;

    constructor(offsetX: number, offsetY: number, zIndex: number) {
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.zIndex = zIndex
        this.needsUpdate = false;
    }

    getOffsetX() : number {
        return this.offsetX
    }

    getOffsetY() : number {
        return this.offsetY
    }
    
    getZIndex() : number {
        return this.zIndex
    }

    public get NeedsUpdate() {
        return this.needsUpdate
    }

    public set NeedsUpdate(value: boolean) {
        this.needsUpdate = value
    }

    abstract render() : void
    
}