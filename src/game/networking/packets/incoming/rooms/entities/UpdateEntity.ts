import { Point } from "pixi.js";
import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../../Engine";
import UserLogic from "../../../../../engine/user/logic/UserLogic";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";
import Point3d from "../../../../../utils/point/Point3d";

export default class UpdateEntity extends MessageHandler {
    public handle(): void {
        let position = this.message.data;

        // check, it's teleport?

        if(Engine.getInstance().RoomsManager?.CurrentRoom) {
            let userVisualization = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(parseInt(position.userId))?.Visualization as UserVisualization;
            userVisualization.setPosition(new Point3d(position.x, position.y, position.z))
            /*if(!userVisualization.IsWalking)
                userVisualization.IsWalking = true;

            userVisualization.NeedsUpdate = true;*/
        }
    }
}