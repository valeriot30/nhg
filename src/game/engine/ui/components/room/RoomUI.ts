import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import RoomGUI from "../../../../../components/gui/room/RoomGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';
import Point from '../../../../utils/point/Point';

export default class RoomUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = true
    private gui: Vue


    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(RoomGUI))({
            propsData: {
                visible: this.visible
            }
        });
    }

    public getCanvasContainer() {
        return document.getElementById("roomCanvasContainer")
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