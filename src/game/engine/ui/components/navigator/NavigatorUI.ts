import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import NavigatorGUI from "../../../../../components/gui/navigator/NavigatorGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';
import { NavigatorRoom } from '../../../../core/communication/messages/incoming/navigator/RoomsList';

export default class NavigatorUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = false
    private gui: Vue

    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(NavigatorGUI))({
            propsData: {
                visible: this.visible
            }
        });
    }

    public getCanvasContainer() {
        return document.getElementById("roomCanvasContainer")
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
    public addRoom(room: NavigatorRoom) {
        this.gui.$data['rooms'].push(room);
    }
    public refreshData()
    {
        this.gui.$data['rooms'] = [];
    }
    public force() {
        this.gui.$forceUpdate;
    }
}