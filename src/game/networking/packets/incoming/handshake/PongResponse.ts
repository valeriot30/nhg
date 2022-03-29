import Engine from "../../../../Engine";
import MessageHandler from "../../../../core/communication/messages/MessageHandler"
import { OutgoingPacket } from "../../outgoing/OutgoingPacketEnum";

export class PongResponse extends MessageHandler {
    
    public handle() {
        let engine = Engine.getInstance()

        if (this.message.data && engine.SSO != "") {
            engine.networkingManager?.getPacketManager().applyOut(OutgoingPacket.LoginMessage,
                {
                    sso: String(engine.SSO)
                }
            )
        }
    }
}
