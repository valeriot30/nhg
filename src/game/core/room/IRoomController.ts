import IRoomVisualization from "./IRoomVisualization"
import IRoomLogic from "./IRoomLogic"

export default interface IRoomController {

    getVisualization() : IRoomVisualization
    getLogic() : IRoomLogic
}