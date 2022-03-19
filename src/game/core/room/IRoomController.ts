import IRoomVisualization from "./IRoomVisualization"
import IRoomLogic from "./IRoomLogic"

export default interface IRoomController {

    Visualization : IRoomVisualization
    Logic : IRoomLogic
}