import IRoomObjectController from "./IRoomObjectController"
import IRoomObjectVisualization from "./IRoomObjectVisualization"
import IRoomObjectLogic from "./IRoomObjectLogic"
import Point3d from "../../../utils/point/Point3d"

export default abstract class RoomObjectController implements IRoomObjectController {

    protected id: string
    protected position: Point3d
    protected visualization: IRoomObjectVisualization | null
    protected logic: IRoomObjectLogic | null

    constructor(id: string, position: Point3d, visualization: IRoomObjectVisualization | null, logic: IRoomObjectLogic | null) {
        this.id = id;
        this.position = position
        this.visualization = visualization
        this.logic = logic
    }

    getId(): string {
        return this.id
    }

    getPosition(): Point3d {
        return this.position
    }

    getVisualization(): IRoomObjectVisualization | null {
        return this.visualization
    }

    getLogic(): IRoomObjectLogic | null {
        return this.logic
    }

    setVisualization(visualization: IRoomObjectVisualization) : void {
        this.visualization = visualization
    }

    setLogic(logic: IRoomObjectLogic) : void {
        this.logic = logic
    }

    setPosition(point: Point3d) {
        this.position = point
    }
}