import MessageHandler from "../../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../../Engine";

export default class NewRoomMessage extends MessageHandler {
    public handle(): void {

        let message = this.message;

        Engine.getInstance().GameEnvironment?.ChatManager.computeMessage(message.message, message.shout, message.userName)

    }
}