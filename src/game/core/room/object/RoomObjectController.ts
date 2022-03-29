
import IRoomObjectVisualization from "./IRoomObjectVisualization"
import IRoomObjectLogic from "./IRoomObjectLogic"
import Point3d from "../../../utils/point/Point3d"
import RoomObjectLogic from "./RoomObjectLogic"
import IObjectController from "./IRoomObjectController"
export default abstract class RoomObjectController implements IObjectController {

    public readonly id: string
    protected objectPosition: Point3d
    protected objectVisualization: IRoomObjectVisualization | null
    protected objectLogic: IRoomObjectLogic | null

    constructor(id: string, position: Point3d, visualization: IRoomObjectVisualization | null, logic: IRoomObjectLogic | null) {
        this.id = id;
        this.objectPosition = position
        this.objectVisualization = visualization
        this.objectLogic = logic
    }


    get position(): Point3d {
        return this.objectPosition
    }

    get visualization(): IRoomObjectVisualization | null {
        return this.objectVisualization
    }

    get logic(): IRoomObjectLogic | null {
        return this.objectLogic
    }

    set visualization(objectVisualization: IRoomObjectVisualization | null) {
        this.objectVisualization = objectVisualization;
    }

    set logic(objectLogic: IRoomObjectLogic | null) {
        this.objectLogic = objectLogic
    }

    set position(point: Point3d) {
        this.objectPosition = point
    }
}