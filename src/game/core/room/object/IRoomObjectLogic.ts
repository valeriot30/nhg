import IRoomLogic from "../IRoomLogic"

export default interface IRoomObjectLogic extends IRoomLogic{
    tick(delta: number) : void
}