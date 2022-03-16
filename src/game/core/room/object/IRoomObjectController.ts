import IRoomObjectVisualization from "./IRoomObjectVisualization"
import IRoomObjectLogic from "./RoomObjectLogic"
import Point3d from "../../../utils/point/Point3d"

export default interface IRoomObjectController {
    getId() : string
    getPosition() : Point3d
    getVisualization() : IRoomObjectVisualization | null
    getLogic() : IRoomObjectLogic | null
}