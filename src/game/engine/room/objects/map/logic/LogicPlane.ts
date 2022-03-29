import RoomObjectLogic from "../../../../../core/room/object/RoomObjectLogic"
import RoomPlane from "../RoomPlane"
import RoomObjectController from "../../../../../core/room/object/RoomObjectController"

export default class LogicPlane extends RoomObjectLogic {

    private plane: RoomPlane

    constructor(plane: RoomPlane) {
        super()

        this.plane = plane
    }

    registerEvents(): void {
        this.plane.getMapObjects().forEach((obj) => {
            if (obj instanceof RoomObjectController) {
                obj.logic?.registerEvents()
            }
        })
    }
    
    tick(delta: number) : void {
        this.plane.getMapObjects().forEach((obj) => {
            if (obj instanceof RoomObjectController) {
                obj.logic?.tick(delta)
            }
        })
    }

}