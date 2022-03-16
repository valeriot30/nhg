import MessageHandler from "../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../Engine";
import StaticContainerUI from "../../../../engine/ui/components/static/StaticContainerUI";
import UIComponent from "../../../../engine/ui/components/UIComponentEnum";

export default class CoinsStatus extends MessageHandler {
    public handle(): void {
        let coins = this.message;

        Engine.getInstance().UsersManager!.CurrentUser!.UserInfo.Coins = coins;

        (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.StaticContainerUI) as StaticContainerUI).TopBarGUI.$data.credits = coins.coins;
    }
    
}