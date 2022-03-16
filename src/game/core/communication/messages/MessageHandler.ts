import { IMessageHandler } from "./IMessageHandler"

export default abstract class MessageHandler implements IMessageHandler {
    protected message: any;
    
    public abstract handle(): any

    public setMessage(message: any) : void {
        this.message = message
    }
}