import IComponentUI from "./IComponentUI"

export default interface IComponentDeletableUI extends IComponentUI{
    delete() : void
}