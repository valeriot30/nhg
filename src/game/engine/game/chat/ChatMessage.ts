import Engine from "../../../Engine";
import UiUtils from "../../../utils/UiUtils";
import Avatar from "../../ui/imagers/avatars/Avatar";
import UserVisualization from "../../user/visualization/UserVisualization";

import anime from "animejs";
import { Container } from "pixi.js";

export default class ChatMessage {

    private message: string;
    private authorId: number;
    private authorName: string | undefined;
    private whisper: boolean = false;
    private chatBubbleId: string;

    private chatColor: string;
    
    private x: number = 0;
    private y: number = 0;
    private width: number = 0;

    constructor(message: string, shout: boolean = false, authorId: number,whisper: boolean = false) {
        this.message = message;
        this.chatBubbleId = "ID-"+UiUtils.guidGenerator();
        this.authorId = authorId;
        this.authorName = "undefined";
        this.chatColor = "";
    }

    public send(): void {

        let message: string = this.message;
        let bubbleChatContainer = document.getElementById("chatBubbleContainer");

        let user = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(this.authorId!)

        this.x = user ? UiUtils.getGlobalPosition((user?.Visualization as UserVisualization).Avatar!.Container).tx : - 60;
        this.y = user ? UiUtils.getGlobalPosition((user?.Visualization as UserVisualization).Avatar!.Container).ty -  (Engine.getInstance().UsersManager?.CurrentUser?.Visualization as UserVisualization).Avatar!.Container.height * 2 : 0;
        this.width = message.length * 20;

        let element: string = this.generateChatDiv();
        let html: ChildNode | null = UiUtils.htmlToElement(element);

        if(html) {
            bubbleChatContainer?.appendChild(html);
        }

        let chatMessage = document.getElementById(this.chatBubbleId);

        let chatInterval = setInterval(() => {

            if (!this.checkVisible(chatMessage)) {
                chatMessage?.remove();
            }

            anime({
                targets: ".chatBubble",
                top: "-=" + 26,
                easing: 'easeInQuad',
                duration: 1000
            });

        }, 2001);
    }

    /*public cycle(): void {


        var rect = chatMessage?.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

        while(this.checkVisible(chatMessage)) {
            anime({
                targets: ".chatBubble",
                top: "-=" + 26,
                easing: 'easeInQuad',
                duration: 100
            });
        }
        chatMessage?.remove();
    }*/

    private checkVisible(elm: HTMLElement | null) {
        var rect = elm?.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect!.bottom < 0 || rect!.top - viewHeight >= 0);
    }
    private generateChatDiv(): string {
        let chatDiv = `<div id="${this.chatBubbleId}" class="chatBubble ${this.whisper ? "chatBubbleWhisper" : ""} chatColor${this.chatColor}" style="left: ${this.x - 32}px; top: ${this.y + 20}px;">
            <div class="chatBubbleContainer">
                <div class="playerHeadContainer">
                    <img src="" />
                </div>
                <p>
                    <b>${this.authorName}:</b> ${this.message}
                </p>
        </div>`

        return chatDiv;

    }

}