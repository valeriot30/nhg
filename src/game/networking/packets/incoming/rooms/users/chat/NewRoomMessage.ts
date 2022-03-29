import MessageHandler from "../../../../../../core/communication/messages/MessageHandler";
import { MessageType } from "../../../../../../core/game/chat/MessageType";
import Engine from "../../../../../../Engine";
import ChatData from "../../../../../../engine/game/chat/ChatData";
import ChatMessage from "../../../../../../engine/game/chat/ChatMessage";
import UserEntity from "../../../../../../engine/room/objects/entities/users/UserEntity";
import UserEntityVisualization from "../../../../../../engine/room/objects/entities/users/visualization/UserEntityVisualization";
import RoomUI from "../../../../../../engine/ui/components/room/RoomUI";
import UIComponent from "../../../../../../engine/ui/components/UIComponentEnum";
import { ActionId } from "../../../../../../engine/ui/imagers/avatars/Avatar";

export default class NewRoomMessage extends MessageHandler {
    public handle(): void {

        let message = this.message;

        let entity: UserEntity = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.getEntity(message.id) as UserEntity;
        let chatMessage = new ChatMessage(message.message, entity, message.shout ? MessageType.SHOUT : MessageType.DEFAULT);
        Engine.getInstance().GameEnvironment?.ChatManager.addMessage(chatMessage);
        (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.RoomUI) as RoomUI).addChatMessage(chatMessage)

        let entityVisualization = (entity.visualization as UserEntityVisualization)
        entityVisualization.addAction(ActionId.TALK)

        entityVisualization.NeedsUpdate = true;

        setTimeout(() => {
            entityVisualization.removeAction(ActionId.TALK)
            entityVisualization.NeedsUpdate = false;
            entityVisualization.updateFrame(0);
            entityVisualization.draw()
        }, message.message.length * ChatData.SPEAK_SPEED)

    }
}