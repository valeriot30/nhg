import Engine from "../../../Engine";
import UiUtils from "../../../utils/UiUtils";
import UserEntityVisualization from "../../room/objects/entities/users/visualization/UserEntityVisualization";
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

    public registerEvents(): void {
        ((this.user.visualization as UserVisualization).userEntity?.visualization as UserEntityVisualization).Avatar?.Container.addListener('pointerdown', () => this.onUserClick())
    }

    public onUserClick(): void {
        (this.user.visualization as UserVisualization).openMenu();
        (this.user.visualization as UserVisualization).openPreviewBox()
    }

    public tick(delta: number): void {
        
        if((this.user.visualization as UserVisualization).userEntity) {
            (this.user.visualization as UserVisualization).userEntity?.logic?.tick(delta)
        }
    }
    public get FrameTracker() {
        return this.frameTracker;
    }
}