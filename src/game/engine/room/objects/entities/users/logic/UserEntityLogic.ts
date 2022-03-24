
import Entity from "../../../../../../core/room/object/entities/Entity";
import EntityLogic from "../../../../../../core/room/object/entities/EntityLogic";
import IEntityLogic from "../../../../../../core/room/object/entities/IEntityLogic";
import Engine from "../../../../../../Engine";
import Point from "../../../../../../utils/point/Point";
import UiUtils from "../../../../../../utils/UiUtils";
import AvatarContainerUI from "../../../../../ui/components/avatar/AvatarContainerUI";
import PreviewBoxUI from "../../../../../ui/components/general/PreviewBoxUI";
import UserPanelUI from "../../../../../ui/components/room/UserPanelUI";
import StaticContainerUI from "../../../../../ui/components/static/StaticContainerUI";
import UIComponent from "../../../../../ui/components/UIComponentEnum";
import Avatar from "../../../../../ui/imagers/avatars/Avatar";
import AvatarData from "../../../../../ui/imagers/avatars/imager/AvatarData";
import UserEntity from "../UserEntity";
import UserEntityVisualization from "../visualization/UserEntityVisualization";

export default class UserEntityLogic extends EntityLogic  {

    private frameTracker: number = 0;

    public constructor(entity: UserEntity) {
        super(entity)
        this.registerEvents()
    }

    public registerEvents() {
        let UserEntityVisualization = this.entity.getVisualization() as UserEntityVisualization
        let staticContainer = Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.StaticContainerUI) as StaticContainerUI

        UserEntityVisualization.Avatar?.Container.addListener('pointerdown', () => this.userPointerDown())
        UserEntityVisualization.Avatar?.Container.on('user-position-changed',() => this.userPositionChanged())
        staticContainer.Gui.$on('user-start-typing', () => this.userStartedTyping())
    }

    public userPositionChanged() {
        let UserEntityVisualization = this.entity.getVisualization() as UserEntityVisualization
        let avatarContainerUI = Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.AvatarContainerUI) as AvatarContainerUI

        let dimension = new Point(UserEntityVisualization.Avatar?.Container.height!,
            UserEntityVisualization.Avatar?.Container.width!
            );                

        let position = new Point(UiUtils.getGlobalPosition(UserEntityVisualization.Avatar!.Container).tx + dimension.getY() + AvatarData.AVATAR_LEFT_TYPING_OFFSET,
                                UiUtils.getGlobalPosition(UserEntityVisualization.Avatar!.Container).ty - dimension.getX() + AvatarData.AVATAR_TOP_TYPING_OFFSET);        
                                

        avatarContainerUI.setSize(position, dimension)
    }
    public userStartedTyping() {
        let avatarContainerUI = Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.AvatarContainerUI) as AvatarContainerUI
        avatarContainerUI.startTyping()
    }

    public userPointerDown() {
        this.openMenu();
        this.openPreviewBox();
    }

    public openMenu() {
        let menu = (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.UserPanelUI) as UserPanelUI);
        let global = UiUtils.getGlobalPosition((this.entity.getVisualization() as UserEntityVisualization).Avatar!.Container);
        menu.setUser("");
        menu.setPosition(global.tx - 5, (global.ty - AvatarData.AVATAR_GENERIC_HEIGHT - 50));
        menu.show();
    }

    public openPreviewBox() {
        let previewBox = (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.PreviewBoxUI) as PreviewBoxUI)
            previewBox.Gui.$data.mode = 'user';
            previewBox.Gui.$data.motto = "motto";
            previewBox.Gui.$data.username = this.entity.Name
            if(this.entity.Name !== Engine.getInstance().UsersManager?.CurrentUser?.UserInfo.Username) {
                previewBox.Gui.$data.optionVisible = true;
            }
            let image: HTMLImageElement | undefined = UiUtils.generateImageFromObject((this.entity.getVisualization() as UserEntityVisualization).Avatar!.Container);
            previewBox.Gui.$data.image = image?.src;
            previewBox.Gui.$forceUpdate();
            previewBox.show();
    }

    tick(delta: number): void {
        let userVisualization = (this.entity.getVisualization() as UserEntityVisualization)

        if(userVisualization.NeedsUpdate) {
            this.frameTracker += delta;

            if (this.frameTracker >= 100) {
                userVisualization.nextFrame();
                this.frameTracker = 0;
                (userVisualization as UserEntityVisualization).draw();
            }
            userVisualization.walk(delta);
        }
    }
}