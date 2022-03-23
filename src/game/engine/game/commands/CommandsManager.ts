import Command from "./Command";
import { ICommand } from "../../../core/game/commands/ICommand";
import ZoomCommand from "./ZoomCommand";
import IqqdCommand from "./IqqdCommand";

export default class CommandsManager {

    private _commands : Map<string, Command> = new Map();

    constructor() {
        this.init();
    }

    public async init() {
        this.addCommand("zoom", new ZoomCommand())
        this.addCommand("iqqd", new IqqdCommand())
    }

    private addCommand(name: string, command: Command) : void {
        if(!this._commands.get(name)) {
            this._commands.set(name, command)
        }
    }

    public destroy() {
        this._commands.clear();
    }

    public get commands() : Map<string, Command> {
        return this._commands;
    }

}