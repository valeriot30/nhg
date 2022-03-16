import IRoomMapObject from "./IRoomMapObject";

export default interface IRoomMapPlane {
    getMapObjects() : Array<IRoomMapObject>
}