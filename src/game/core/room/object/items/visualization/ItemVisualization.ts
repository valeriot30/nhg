import Engine from "../../../../../Engine";
import Item from "../../../../../engine/room/objects/items/Item";
import MapData from "../../../../../engine/room/objects/map/MapData";
import Tile from "../../../../../engine/room/objects/map/Tile";
import RoomVisualization from "../../../../../engine/room/visualization/RoomVisualization";
import AvatarData from "../../../../../engine/ui/imagers/avatars/imager/AvatarData";
import { ItemType } from "../../../../../engine/ui/imagers/items/FurniImager";
import { FurniSprite } from "../../../../../engine/ui/imagers/items/FurniSprite";
import Point from "../../../../../utils/point/Point";
import Point3d from "../../../../../utils/point/Point3d";
import UiUtils from "../../../../../utils/UiUtils";
import IRoomVisualization from "../../../IRoomVisualization";
import IRoomObjectVisualization from "../../IRoomObjectVisualization";

export default abstract class ItemVisualization implements IRoomObjectVisualization {

    protected item: Item;

    private needsUpdate: boolean = false
    private position: Point3d;

    private imagePreview: string | undefined;

    private iconImage: string | undefined;

    constructor(item: Item) {
        this.item = item;
        this.position = item.position
        this.imagePreview = this.generateImagePreview();
        this.iconImage = this.generateIcon();
    }

    private updatePosition() {
        let currentRoom = Engine.getInstance().RoomsManager?.CurrentRoom;
        let tile: Tile | undefined = currentRoom?.getRoomLayout().getFloorPlane().getTilebyPosition(new Point(Math.round(this.position.getX()), Math.round(this.position.getY()))); // get the tile where you want to set avatar
        let offsetFloor = tile!.position.getZ() > 0 ? -MapData.thickSpace * MapData.stepHeight * tile!.position.getZ() : -AvatarData.AVATAR_TOP_OFFSET;

        const offset = currentRoom?.getRoomLayout().getOffset(this.position.getX(), this.position.getY(), this.position.getZ());


        this.item.base.x = offset?.getX()! - tile?.visualization!.getOffsetX()! + MapData.drawingFurniOffsetX;
        this.item.base.y = offset?.getY()! - tile?.visualization!.getOffsetY()! + MapData.drawingFurniOffsetY;


        (currentRoom?.getRoomLayout().Visualization as RoomVisualization).Container.addChild(this.item.base)
        this.item.base.zIndex = 16;

    }

    private generateImagePreview() {
        return UiUtils.generateBase64FromObject(this.item.base);
    }
    private generateIcon(): string | undefined{
        let icon: FurniSprite = this.item.base.turnIntoIcon()
        this.item.base.restore()
        return UiUtils.generateBase64FromObject(icon);
    }

    public render(): void {
        this.updatePosition()
    }

    public getItem() : Item {
        return this.item;
    }

    public getVisualizationType() : string  {
        return this.item.base.furniBase.visualizationType;
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

    public get ImagePreview(): string | undefined {
        return this.imagePreview;
    }
    public get Icon(): string | undefined {
        return this.iconImage;
    }

}