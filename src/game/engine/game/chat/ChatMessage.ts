import UiUtils from "../../../utils/UiUtils";
import UserEntityVisualization from "../../room/objects/entities/users/visualization/UserEntityVisualization";
import { MessageType } from "../../../core/game/chat/MessageType";
import Entity from "../../../core/room/object/entities/Entity";
import AvatarData from "../../ui/imagers/avatars/imager/AvatarData";

export default class ChatMessage {
    private  messageType: MessageType;

    private message: string;
    private author: Entity;
    private whisper: boolean = false;
    private chatBubbleId: string;
    private x: number = 0;
    private y: number = 0;
    private width: number = 0;

    constructor(message: string, author: Entity, messageType: MessageType) {
        this.message = message;
        this.messageType = messageType
        this.chatBubbleId = "ID-"+ UiUtils.guidGenerator();
        this.author = author;
        this.compose()
    }

    public compose() {
        this.x = this.author ? UiUtils.getGlobalPosition((this.author?.visualization as UserEntityVisualization).Avatar!.Container).tx + AvatarData.AVATAR_LEFT_OFFSET : - AvatarData.AVATAR_GENERIC_WIDTH;
        this.y = this.author ? UiUtils.getGlobalPosition((this.author.visualization as UserEntityVisualization).Avatar!.Container).ty -  (this.author.visualization as UserEntityVisualization).Avatar!.Container.height * 2: 0;
    }

    public get Message(): string { return this.message }
    public get MessageType(): MessageType { return this.messageType }
    public get Id(): string { return this.chatBubbleId}
    public get X(): number { return this.x; }
    public get Y(): number { return this.y; }
    public get Author(): Entity { return this.author; }
}