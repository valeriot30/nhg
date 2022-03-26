import IRoomObjectLogic from "./IRoomObjectLogic"

export default abstract class RoomObjectLogic implements IRoomObjectLogic {

    abstract tick(delta: number) : void

    abstract registerEvents() : void

}