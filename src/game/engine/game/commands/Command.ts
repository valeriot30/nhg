import { ICommand } from "../../../core/game/commands/ICommand";

export default abstract class Command implements ICommand {

    constructor() {
    }

    public abstract handle(params: string[]) : void

}