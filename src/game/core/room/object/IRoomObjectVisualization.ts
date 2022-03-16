import IRoomVisualization from "../IRoomVisualization"

export default interface IRoomObjectVisualization extends IRoomVisualization {
    NeedsUpdate: boolean;

    getOffsetX(): number
    getOffsetY(): number
    getZIndex(): number

}