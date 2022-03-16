import MessageHandler from "../../../../core/communication/messages/MessageHandler";
import Engine from "../../../../Engine";
import NavigatorUI from "../../../../engine/ui/components/navigator/NavigatorUI";
import UIComponent from "../../../../engine/ui/components/UIComponentEnum";

export default class AllRoomsList extends MessageHandler {

    public handle() {
        
        let rooms = this.message.rooms;

        let navUI = Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.NavigatorUI) as NavigatorUI;

        if(navUI) {

            navUI.refreshData();
            
            for(let roomIndex in rooms)
            {
                let room = rooms[roomIndex]
                room.type = "all";
                navUI.addRoom(room);
            }
            navUI.force();
        }

    }

}
