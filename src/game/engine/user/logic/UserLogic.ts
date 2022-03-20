import Engine from "../../../Engine";
import UiUtils from "../../../utils/UiUtils";
import PreviewBoxUI from "../../ui/components/general/PreviewBoxUI";
import UserPanelUI from "../../ui/components/room/UserPanelUI";
import UIComponent from "../../ui/components/UIComponentEnum";
import { ActionId } from "../../ui/imagers/avatars/Avatar";
import AvatarData from "../../ui/imagers/avatars/imager/AvatarData";
import User from "../User";
import UserVisualization from "../visualization/UserVisualization";

export default class UserLogic implements IUserLogic {
    private user: User;

    private frameTracker: number = 0;

    constructor(user: User) {
        this.user = user
    }

    

    public tick(delta: number): void {
        //todo tick user 
       
    }
    public get FrameTracker() {
        return this.frameTracker;
    }
}