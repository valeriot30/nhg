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

    public registerEvents() {
        (this.user.Visualization as UserVisualization).Avatar?.Container.addListener('pointerdown', () => {
            this.openMenu();
            this.openPreviewBox();
        });
    }

    public openMenu() {
        let menu = (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.UserPanelUI) as UserPanelUI);
        let global = UiUtils.getGlobalPosition((this.user.Visualization as UserVisualization).Avatar!.Container);
        menu.setUser(this.user.UserInfo.Username!);
        menu.setPosition(global.tx - 5, (global.ty - AvatarData.AVATAR_GENERIC_HEIGHT - 50));
        menu.show();
    }

    public openPreviewBox() {
        let previewBox = (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.PreviewBoxUI) as PreviewBoxUI)
            previewBox.Gui.$data.mode = 'user';
            previewBox.Gui.$data.motto = this.user.UserInfo.getMotto();
            previewBox.Gui.$data.username = this.user.UserInfo.Username;
            if(this.user.UserInfo.Username !== Engine.getInstance().UsersManager?.CurrentUser?.UserInfo.Username) {
                previewBox.Gui.$data.optionVisible = true;
            }
            let image: HTMLImageElement | undefined = UiUtils.generateImageFromObject((this.user.Visualization as UserVisualization).Avatar!.Container);
            previewBox.Gui.$data.image = image?.src;
            previewBox.Gui.$forceUpdate();
            previewBox.show();
    }

    public tick(delta: number): void {
        let userVisualization = (this.user.Visualization as UserVisualization)

        if(userVisualization.NeedsUpdate) {
            this.frameTracker += delta;

            if (this.frameTracker >= 100) {
                userVisualization.nextFrame();
                this.frameTracker = 0;
            }
            (userVisualization as UserVisualization).draw();
            userVisualization.walk(delta);
        }
       
    }
    public get FrameTracker() {
        return this.frameTracker;
    }
}