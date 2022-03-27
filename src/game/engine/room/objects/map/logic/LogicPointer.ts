import RoomObjectLogic from "../../../../../core/room/object/RoomObjectLogic";
import Pointer from "../Pointer";
import Point from "../../../../../utils/point/Point";
import ColorRGB from "../../../../../utils/color/ColorRGB";

export default class LogicPointer extends RoomObjectLogic {

    private pointer: Pointer
    private currentColor: ColorRGB = new ColorRGB(0,0,0)

    constructor(pointer: Pointer) {
        super()
        this.pointer = pointer

    }

    public registerEvents() {
        
    }

    public movePointer(point: Point, zIndex: number, color: ColorRGB) {
        
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