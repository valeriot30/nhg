import RoomObjectLogic from "../../../../../core/room/object/RoomObjectLogic";
import Pointer from "../Pointer";
import Point from "../../../../../utils/point/Point";
import ColorRGB from "../../../../../utils/color/ColorRGB";
import ScreenUtils from "../../../../../utils/ScreenUtils";
import RoomVisualization from "../../../visualization/RoomVisualization";
import Room from "../../../Room";
import VisualizationPointer from "../visualization/VisualizationPointer";
import Engine from "../../../../../Engine";

export default class LogicPointer extends RoomObjectLogic {

    private pointer: Pointer
    private currentColor: ColorRGB = new ColorRGB(0,0,0)

    constructor(pointer: Pointer) {
        super()
        this.pointer = pointer
    }

    public movePointer(point: Point, zIndex: number, color: ColorRGB) {
        /*let pointerWidth = (this.pointer.Visualization as VisualizationPointer).getPointerWidth()
        let canvasFloor = (this.pointer.getRoomLayout().Visualization as RoomVisualization).getCanvasFloor()
        let coords = ScreenUtils.localToScreenPosition(
            canvasFloor,
            point.getX() + this.pointer.getRoomLayout().getRoomOffset().getX() + pointerWidth/3 - 1,
            point.getY() + this.pointer.getRoomLayout().getRoomOffset().getY() + pointerWidth/3 - 2)
        this.pointer.getCanvas().style.left = coords.x + "px"
        this.pointer.getCanvas().style.top = coords.y + "px"
        this.pointer.getCanvas().style.display = "block"
        this.pointer.getCanvas().style.zIndex = zIndex.toString()
        this.currentColor = color*/
    }

    public hidePointer() {
        this.currentColor = new ColorRGB(0,0,0)
        this.pointer.getCanvas().visible = false;
    }

    public getCurrentColor() {
        return this.currentColor
    }

    tick(delta: number): void {}
    
}