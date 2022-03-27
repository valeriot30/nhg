
import EntityLogic from "../../../../../../core/room/object/entities/EntityLogic";
import Engine from "../../../../../../Engine";
import Point from "../../../../../../utils/point/Point";
import UiUtils from "../../../../../../utils/UiUtils";
import AvatarContainerUI from "../../../../../ui/components/avatar/AvatarContainerUI";
import StaticContainerUI from "../../../../../ui/components/static/StaticContainerUI";
import UIComponent from "../../../../../ui/components/UIComponentEnum";
import { ActionId } from "../../../../../ui/imagers/avatars/Avatar";
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
        UserEntityVisualization.Avatar?.Container.on('user-position-changed',() => this.onPositionChanged())
        UserEntityVisualization.Avatar?.Container.on('user-started-typing', () => this.userToggleTyping(true))
        UserEntityVisualization.Avatar?.Container.on('user-stop-typing', () => this.userToggleTyping(false))
    }

    public onPositionChanged() {
        this.setAvatarContainer()
    }
    public setAvatarContainer() {
        let UserEntityVisualization = this.entity.getVisualization() as UserEntityVisualization
        let avatarContainerUI = Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.AvatarContainerUI) as AvatarContainerUI

        let dimension = new Point(UserEntityVisualization.Avatar?.Container.height!,
            UserEntityVisualization.Avatar?.Container.width!
            );                

        let position = new Point(UiUtils.getGlobalPosition(UserEntityVisualization.Avatar!.Container).tx + dimension.getY() + AvatarData.AVATAR_LEFT_TYPING_OFFSET,
                                UiUtils.getGlobalPosition(UserEntityVisualization.Avatar!.Container).ty - dimension.getX() + AvatarData.AVATAR_TOP_TYPING_OFFSET);        
                                

        avatarContainerUI.setSize(position, dimension)
    }
    public userToggleTyping(value: boolean) {
        this.setAvatarContainer()
        let avatarContainerUI = Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.AvatarContainerUI) as AvatarContainerUI
        avatarContainerUI.toggleTyping(value)
    }


    public tick(delta: number): void {
        let userVisualization = (this.entity.getVisualization() as UserEntityVisualization)

        if(userVisualization.NeedsUpdate) {
            this.frameTracker += delta;

            if (this.frameTracker >= 100) {
                userVisualization.nextFrame();
                this.frameTracker = 0;
                (userVisualization as UserEntityVisualization).draw();
            }
            if(userVisualization.Actions.has(ActionId.WALK)) {
                userVisualization.walk(delta);
            }
        }
    }
}