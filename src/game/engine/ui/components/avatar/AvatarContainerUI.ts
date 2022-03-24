import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import AvatarContainerGUI from "../../../../../components/gui/avatar/AvatarContainerGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';
import Point from '../../../../utils/point/Point';
import ChatMessage from '../../../game/chat/ChatMessage';
import anime from 'animejs';
import { MessageType } from '../../../../core/game/chat/MessageType';
import Engine from '../../../../Engine';

export default class AvatarContainerUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = true
    private gui: Vue

    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(AvatarContainerGUI))({
            propsData: {
                visible: this.visible
            }
        });
    }

    public setSize(position:Point, dimension: Point) : void
    {
        this.gui.$data.x = position.getX()
        this.gui.$data.y = position.getY()
        this.gui.$data.h = dimension.getX()
        this.gui.$data.w = dimension.getY()
        this.gui.$forceUpdate()
        
    }
    public startTyping() {
        this.gui.$data.typing = true;
        this.gui.$forceUpdate()
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
}