import UserInterfaceManager from "../UserInterfaceManager";
import UIComponent from "./UIComponentEnum"

import RoomUI from "./room/RoomUI"
import GameLoaderUI from "./loader/GameLoaderUI"
import StaticContainerUI from "./static/StaticContainerUI"
import IComponentUI from "../../../core/ui/IComponentUI";
import NavigatorUI from "./navigator/NavigatorUI";
import FriendsMenuUI from "./friends/FriendsMenuUI"
import PreviewBoxUI from "./general/PreviewBoxUI";
import FurniListUI from "./general/FurniListUI";
import CreateRoomUI from "./navigator/CreateRoomUI";
import LoginUI from "./login/LoginUI";
import CatalogueUI from "./catalogue/CatalogueUI";
import RoomInfoUI from "./room/RoomInfoUI";
import RoomEditInfoUI from "./room/RoomEditInfoUI";
import DefaultPanel from "./panel/DefaultPanel";
import UserPanelUI from "./room/UserPanelUI";
import AvatarContainerUI from "./avatar/AvatarContainerUI";

export default class UIComponentManager {

    private userInterfaceManager: UserInterfaceManager
    private gameComponents = new Map<UIComponent, IComponentUI>()

    private rootComponent: HTMLElement
    private loginComponent: LoginUI | null = null;

    constructor(userInterfaceManager: UserInterfaceManager) {
        this.userInterfaceManager = userInterfaceManager

        this.rootComponent = document.getElementById("gameContainer")!
    }

    public loadGameComponents() : void {
        this.addComponent(UIComponent.RoomUI, new RoomUI(this))
        this.addComponent(UIComponent.GameLoaderUI, new GameLoaderUI(this))
        this.addComponent(UIComponent.StaticContainerUI, new StaticContainerUI(this))
        this.addComponent(UIComponent.NavigatorUI, new NavigatorUI(this));
        this.addComponent(UIComponent.FriendsMenuUI, new FriendsMenuUI(this));
        this.addComponent(UIComponent.PreviewBoxUI, new PreviewBoxUI(this))
        this.addComponent(UIComponent.FurniListUI, new FurniListUI(this))
        this.addComponent(UIComponent.CreateRoomUI, new CreateRoomUI(this))
        this.addComponent(UIComponent.CatalogueUI, new CatalogueUI(this))
        this.addComponent(UIComponent.RoomInfoUI, new RoomInfoUI(this))
        this.addComponent(UIComponent.UserPanelUI, new UserPanelUI(this))
        this.addComponent(UIComponent.RoomEditInfoUI, new RoomEditInfoUI(this))
        this.addComponent(UIComponent.DefaultPanelUI, new DefaultPanel(this));
        this.addComponent(UIComponent.AvatarContainerUI, new AvatarContainerUI(this))
    }

    public initGameComponents() {
        this.gameComponents.forEach(component => {
            component.init()
        });
    }

    public getComponent(componentKey: UIComponent) : IComponentUI | undefined {
        return this.gameComponents.get(componentKey)
    }

    public getRootComponent() : HTMLElement {
        return this.rootComponent
    }

    public addComponent(componentKey: UIComponent, component: IComponentUI) : void {
        if (this.gameComponents.has(componentKey))
            return
        
        this.gameComponents.set(componentKey, component)
    }

    public getUserInterfaceManager() : UserInterfaceManager {
        return this.userInterfaceManager
    }

    public getLoginComponent() {
        return this.loginComponent
    }
}