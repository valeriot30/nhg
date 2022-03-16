import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import UserPanelGUI from "../../../../../components/gui/room/UserPanelGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';
import Point from '../../../../utils/point/Point';

export default class UserPanelUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = false
    private gui: Vue


    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(UserPanelGUI))({
            propsData: {
                visible: this.visible
            }
        });
    }

    public init(): void {
        this.gui.$mount();
        this.componentManager.getRootComponent().appendChild(this.gui.$el)
    }

    public setUser(userName: string) {
        this.gui.$data.userName = userName;
    }

    public setPosition(x: number, y: number): void {
        this.gui.$data.userLeft = x;
        this.gui.$data.userTop = y;
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

    public get Gui(): Vue {
        return this.gui;
    }

    public get chatBubbleContainer() : any {
        return this.gui.$refs.chatBubbleContainer;
    }
}