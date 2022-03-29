import Engine from "../../../Engine";
import { OutgoingPacket } from "../../../networking/packets/outgoing/OutgoingPacketEnum";
import ChatMessage from "./ChatMessage";

export default class ChatManager {

    private messages: Map<string, ChatMessage>;

    constructor() {
        this.messages = new Map();
    }

    public addMessage(chatMessage: ChatMessage) {
       this.messages.set(chatMessage.Id, chatMessage); 
    }
    public removeMessage(Id: string) {
        if(!this.messages.has(Id)) {
            return;
        }

        this.messages.delete(Id);
    }

    public computeMessage(message: string, shout: boolean = false, authorName: string) {
        if(message.startsWith(":")) {
            let commandsManager = Engine.getInstance().GameEnvironment?.CommandsManager;
            let _args = message.split(" ");
            let args = [];
            for(let i = 1; i < _args.length; i++) {
                args.push(_args[i]);
            }

            let splittedMessage = _args[0].substring(1);
            if(commandsManager?.commands.has(splittedMessage)) {
                let commandClass = commandsManager.commands.get(splittedMessage);
                commandClass?.handle(args)
            } else {
                Engine.getInstance().networkingManager?.getPacketManager().applyOut(OutgoingPacket.UserSay, {
                    message: message,
                    shout: shout
                })
            } 
        } else {
            Engine.getInstance().networkingManager?.getPacketManager().applyOut(OutgoingPacket.UserSay, {
                message: message,
                shout: shout
            })
        }
    }
}