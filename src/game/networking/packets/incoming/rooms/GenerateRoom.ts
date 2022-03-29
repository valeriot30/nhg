import MessageHandler from "../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../Engine";
import Point from "../../../../utils/point/Point";

export default class GenerateRoom extends MessageHandler {
  public handle(): void {
    let room = this.message;

    if (Engine.getInstance().RoomsManager?.CurrentRoom != null) {
      Engine.getInstance().RoomsManager?.unsetRoom();
    }

    Engine.getInstance().RoomsManager?.setRoom(
      room.name,
      room.layout,
      new Point(room.door_x, room.door_y),
      room.id
    );
  }
}
