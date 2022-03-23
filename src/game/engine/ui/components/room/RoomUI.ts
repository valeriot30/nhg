import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import RoomGUI from "../../../../../components/gui/room/RoomGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';
import Point from '../../../../utils/point/Point';
import ChatMessage from '../../../game/chat/ChatMessage';
import anime from 'animejs';
import { MessageType } from '../../../../core/game/chat/MessageType';
import Engine from '../../../../Engine';

export default class RoomUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = true
    private gui: Vue

    private static DEFAULT_CHAT_TIMEOUT: number = 3501
    private static DEFAULT_CHAT_TRANSITION_DURATION: number = 1

    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(RoomGUI))({
            propsData: {
                visible: this.visible
            }
        });

        setInterval(() => {
            this.pushChatBubblesUp(RoomUI.DEFAULT_CHAT_TRANSITION_DURATION)

            let collection: HTMLCollection = document.getElementsByClassName('chatBubble');

            for(let element of collection) {
                if(!this.checkVisible(element as HTMLElement)) {
                    element.remove()
                    Engine.getInstance().GameEnvironment?.ChatManager.removeMessage(element.id);
                }
            }

        }, RoomUI.DEFAULT_CHAT_TIMEOUT)

    }

    public getCanvasContainer() {
        return document.getElementById("roomCanvasContainer")
    }

    private checkVisible(elm: HTMLElement | null) {
        var rect = elm?.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect!.bottom < 0 || rect!.top - viewHeight >= 0);
    }

    private pushChatBubblesUp(time: number = 0) {
        anime({
            targets: ".chatBubble",
            top: "-=" + 26,
            easing: 'linear',
            duration: time
        });
    }

    public setSize(point:Point) : void
    {
        let el = document.getElementById("roomCanvasContainer")

        if (el != null)
        {
            el.style.height = point.getX().toString()
            el.style.width = point.getY().toString()
        }
        
    }

    public addChatMessage(chatMessage: ChatMessage) {

        let rawMessage = {
            id: chatMessage.Id,
            author: chatMessage.Author.Name,
            x: chatMessage.X,
            y: chatMessage.Y,
            text: chatMessage.Message,
            shout: chatMessage.MessageType == MessageType.SHOUT
        }
        this.pushChatBubblesUp(1)
        this.gui.$data.messages.push(rawMessage)
        this.gui.$forceUpdate();
    }

    public init(): void {
        this.gui.$mount();
        this.componentManager.getRootComponent().appendChild(this.gui.$el)
    }
    
    public show() : void
    {
        this.visible = true;
        this.gui.$props.visible = this.visible;
    }

    public hide() : void
    {
        this.visible = false;
        this.gui.$props.visible = this.visible;
    }

    public toggle(): void {
        this.visible = !this.visible;
        this.gui.$props.visible = this.visible;
    }

    public get chatBubbleContainer() : any {
        return this.gui.$refs.chatBubbleContainer;
    }
}