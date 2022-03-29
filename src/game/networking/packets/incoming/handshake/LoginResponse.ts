import Engine from "../../../../Engine";
import MessageHandler from "../../../../core/communication/messages/MessageHandler"
import { OutgoingPacket } from "../../outgoing/OutgoingPacketEnum";
import UIComponent from "../../../../engine/ui/components/UIComponentEnum";
import GameLoaderUI from "../../../../engine/ui/components/loader/GameLoaderUI";

export class LoginResponse extends MessageHandler {
    
    public handle() {
        let engine = Engine.getInstance()
        if (this.message.data) {
            
            (engine.userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.GameLoaderUI) as GameLoaderUI).updateProgress(100);
            engine.networkingManager?.getPacketManager().applyOut(OutgoingPacket.GetUserStats)
            return
        } 

        engine.networkingManager?.getWebSocketManager().disconnect()
        
    }
}
