import ChatManager from "./chat/ChatManager";
import CommandsManager from "./commands/CommandsManager";

export default class Environment {

    private _commandsManager: CommandsManager;
    private _chatManager: ChatManager;

    constructor() {
        this._commandsManager = new CommandsManager();
        this._chatManager = new ChatManager();
    }

    async init() {
        this._commandsManager.init();
    }

    public get CommandsManager() : CommandsManager {
        return this._commandsManager
    }
    public get ChatManager() : ChatManager {
        return this._chatManager
    }

}