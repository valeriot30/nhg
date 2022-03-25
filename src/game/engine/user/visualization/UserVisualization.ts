import anime from "animejs";
import Engine from "../../../Engine";
import Point from "../../../utils/point/Point";
import Point3d from "../../../utils/point/Point3d";
import MapData from "../../room/objects/map/MapData";
import RoomVisualization from "../../room/visualization/RoomVisualization";
import Avatar, { ActionId } from "../../ui/imagers/avatars/Avatar";
import { Direction } from "../../ui/imagers/avatars/Direction";
import UserLogic from "../logic/UserLogic";
import User from "../User";
import AvatarData from "../../ui/imagers/avatars/imager/AvatarData";
import IUserVisualization from "../../../core/users/IUserVisualization";
import Tile from "../../room/objects/map/Tile";
import { Action } from "../../ui/imagers/avatars/imager/gamedata/AvatarActions";
import UserEntity from "../../room/objects/entities/users/UserEntity";
import UiUtils from "../../../utils/UiUtils";
import UIComponent from "../../ui/components/UIComponentEnum";
import UserPanelUI from "../../ui/components/room/UserPanelUI";
import UserEntityVisualization from "../../room/objects/entities/users/visualization/UserEntityVisualization";
import PreviewBoxUI from "../../ui/components/general/PreviewBoxUI";

export default class UserVisualization implements IUserVisualization {

    private user: User

    private userEntity: UserEntity | null

    public constructor(user: User) {
        this.user = user;
        this.userEntity = null;
    }


    public openMenu() {

        if(this.userEntity == undefined) {
            return;
        }

        let menu = (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.UserPanelUI) as UserPanelUI);
        let global = UiUtils.getGlobalPosition((this.userEntity.getVisualization() as UserEntityVisualization).Avatar!.Container);
        menu.setUser("");
        menu.setPosition(global.tx - 5, (global.ty - AvatarData.AVATAR_GENERIC_HEIGHT - 50));
        menu.show();
    }

    public openPreviewBox() {
        if(this.userEntity == undefined) {
            return;
        }

        let previewBox = (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.PreviewBoxUI) as PreviewBoxUI)
            previewBox.Gui.$data.mode = 'user';
            previewBox.Gui.$data.motto = this.user.UserInfo.Motto;
            previewBox.Gui.$data.username = this.user.UserInfo.Username
            if(this.userEntity.Name !== Engine.getInstance().UsersManager?.CurrentUser?.UserInfo.Username) {
                previewBox.Gui.$data.optionVisible = true;
            }
            let image: HTMLImageElement | undefined = UiUtils.generateImageFromObject((this.userEntity.getVisualization() as UserEntityVisualization).Avatar!.Container);
            previewBox.Gui.$data.image = image?.src;
            previewBox.Gui.$forceUpdate();
            previewBox.show();
    }

    public set UserEntity(userEntity: UserEntity | null) {
        this.userEntity = userEntity
    }

    public get UserEntity(): UserEntity | null {
        return this.userEntity
    }
}