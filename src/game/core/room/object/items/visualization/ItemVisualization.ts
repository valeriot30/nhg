import Engine from "../../../../../Engine";
import Item from "../../../../../engine/room/objects/items/Item";
import MapData from "../../../../../engine/room/objects/map/MapData";
import Tile from "../../../../../engine/room/objects/map/Tile";
import RoomVisualization from "../../../../../engine/room/visualization/RoomVisualization";
import AvatarData from "../../../../../engine/ui/imagers/avatars/imager/AvatarData";
import Point from "../../../../../utils/point/Point";
import Point3d from "../../../../../utils/point/Point3d";
import IRoomVisualization from "../../../IRoomVisualization";
import IRoomObjectVisualization from "../../IRoomObjectVisualization";

export default abstract class ItemVisualization implements IRoomObjectVisualization {

    protected item: Item;

    private needsUpdate: boolean = false
    private position: Point3d;

    constructor(item: Item) {
        this.item = item;
        this.position = item.getPosition()
    }

    private updatePosition() {
        let currentRoom = Engine.getInstance().RoomsManager?.CurrentRoom;
        let tile: Tile | undefined = currentRoom?.getRoomLayout().getFloorPlane().getTilebyPosition(new Point(Math.round(this.position.getX()), Math.round(this.position.getY()))); // get the tile where you want to set avatar
        let offsetFloor = tile!.getPosition().getZ() > 0 ? -MapData.thickSpace * MapData.stepHeight * tile!.getPosition().getZ() : -AvatarData.AVATAR_TOP_OFFSET;

        const offset = currentRoom?.getRoomLayout().getOffset(this.position.getX(), this.position.getY(), this.position.getZ());


        this.item.Base.x = offset?.getX()! - tile?.getVisualization()!.getOffsetX()! + MapData.drawingFurniOffsetX;
        this.item.Base.y = offset?.getY()! - tile?.getVisualization()!.getOffsetY()! + MapData.drawingFurniOffsetY;


        (currentRoom?.getRoomLayout().Visualization as RoomVisualization).Container.addChild(this.item.Base)
        this.item.Base.zIndex = 16;

    }

    public render(): void {
        this.updatePosition()
    }

    public getItem() : Item {
        return this.item;
    }

    public getVisualizationType() : string  {
        return this.item.Base.furniBase.visualizationType;
    }

    public getOffsetX(): number {
        throw new Error("Method not implemented.");
    }
    public getOffsetY(): number {
        throw new Error("Method not implemented.");
    }
    public getZIndex(): number {
        throw new Error("Method not implemented.");
    }

    public get NeedsUpdate(): boolean {
        return this.needsUpdate
    }

}