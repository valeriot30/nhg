import IComponentUI from "./IComponentUI"

export default interface IComponentShowableUI extends IComponentUI{

    visible : boolean
    
    hide() : void
    show() : void
    toggle() : void
}