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
        ((this.user.Visualization as UserVisualization).UserEntity?.getVisualization() as UserEntityVisualization).Avatar?.Container.addListener('pointerdown', () => this.onUserClick())
    }

    public onUserClick(): void {
        (this.user.Visualization as UserVisualization).openMenu();
        (this.user.Visualization as UserVisualization).openPreviewBox()
    }

    public tick(delta: number): void {
        //todo tick user 
    }
    public get FrameTracker() {
        return this.frameTracker;
    }
}