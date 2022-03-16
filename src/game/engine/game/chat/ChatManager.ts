import Engine from "../../../Engine";
import { ActionId } from "../../ui/imagers/avatars/Avatar";
import UserVisualization from "../../user/visualization/UserVisualization";
import ChatMessage from "./ChatMessage";

export default class ChatManager {

    private static GESTURES: string[] = [":D", "o/", ":P", ":@", ":(", ":)", ":O", ":o"];


    constructor() {

    }

    public computeMessage(message: string, shout: boolean = false, author: string) {
        let userVisualization = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(author)?.Visualization as UserVisualization;
        if(message.startsWith(":")) {
            let commandsManager = Engine.getInstance().GameEnvironment?.CommandsManager;
            let _args = message.split(" ");
            let args = [];
            for (let i = 1; i < _args.length; i++) {
                args.push(_args[i]);
            }

            let splittedMessage = _args[0].substring(1);
            if (commandsManager?.commands.has(splittedMessage)) {
                let commandClass = commandsManager.commands.get(splittedMessage);
                commandClass?.handle(args)
            } 
            else {
                this.handleGesture(userVisualization, message)
            }

        } else {
            if(!this.handleGesture(userVisualization, message)) {
                userVisualization.Action = ActionId.TALK;
                userVisualization.NeedsUpdate = true;
                let chat = new ChatMessage(message, shout, author);
                chat.send();
                setTimeout(() => {
                    userVisualization.NeedsUpdate = false;
                    userVisualization.Action = ActionId.STAND;
                    userVisualization.draw();
                }, 200 * message.length);
            }

        }
    }

    private handleGesture(userVisualization: UserVisualization, message: string): boolean {
        
        if(ChatManager.GESTURES.includes(message)) {
            let gesture = message;
            let action: ActionId = this.getActionFromGestureMessage(gesture);
            userVisualization.Action = action;
            userVisualization.NeedsUpdate = true;

            setTimeout(() => {
                userVisualization.NeedsUpdate = false;
                userVisualization.Action = ActionId.STAND;
                userVisualization.draw();
            }, (Engine.getInstance().getConfig().fps * 100) / 2);
            return true;
        } else {
            return false;
        }
    }

    public getActionFromGestureMessage(gesture: string): ActionId {
        switch(gesture) {
            case ":D":
                return ActionId.SMILE;
            case ":(":
                return ActionId.SAD;
            case ":@":
                return ActionId.ANGRY;
            case "o/":
                return ActionId.WAVE;
            case ":)":
                return ActionId.SMILE;      
            case ":O":
                return ActionId.SURPRISED;
            case ":o":
                return ActionId.SURPRISED;                            
                
        }

        return ActionId.STAND;
    }
}