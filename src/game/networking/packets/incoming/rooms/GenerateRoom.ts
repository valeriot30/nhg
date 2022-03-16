import MessageHandler from "../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../Engine";
import Point from "../../../../utils/point/Point";

export default class GenerateRoom extends MessageHandler{
    public handle(): void {

        let room = this.message;

        if(room.id !== Engine.getInstance().RoomsManager?.CurrentRoom?.Id) {
            if(Engine.getInstance().RoomsManager?.CurrentRoom != null) {
                Engine.getInstance().RoomsManager?.unsetRoom();
            }
            
            let current = Engine.getInstance().RoomsManager?.setRoom(room.name, room.model, new Point(room.doorx, room.doory), room.id);
        }
    }
}