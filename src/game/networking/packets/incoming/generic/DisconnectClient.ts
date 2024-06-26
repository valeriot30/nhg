import MessageHandler from "../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../Engine";
import RoomVisualization from "../../../../engine/room/visualization/RoomVisualization";
import DefaultPanel from "../../../../engine/ui/components/panel/DefaultPanel";
import UIComponent from "../../../../engine/ui/components/UIComponentEnum";

export default class DisconnectClient extends MessageHandler {
    public handle(): void {
        let reason = this.message.data;

        if(Engine.getInstance().RoomsManager?.CurrentRoom != null) {
            (Engine.getInstance().RoomsManager?.CurrentRoom?.getRoomLayout().Visualization as RoomVisualization).Container.destroy();
        }

        (Engine.getInstance().userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.DefaultPanelUI) as DefaultPanel).set(reason);
    }
}