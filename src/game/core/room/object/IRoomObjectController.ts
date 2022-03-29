import IRoomObjectVisualization from "./IRoomObjectVisualization"
import IRoomObjectLogic from "./RoomObjectLogic"
import Point3d from "../../../utils/point/Point3d"

export default interface IRoomObjectController {
    readonly id : string
    position : Point3d
    visualization: IRoomObjectVisualization | null
    logic : IRoomObjectLogic | null
}