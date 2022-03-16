import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import RoomInfoGUI from "../../../../../components/gui/room/RoomInfoGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';

export default class LoginUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = false
    private gui: Vue

    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(RoomInfoGUI))({
            propsData: {
                visible: this.visible
            }
        });
    }

    public init(): void {
        this.gui.$mount();
        this.componentManager.getRootComponent().appendChild(this.gui.$el)
    }

    public show(): void {
        this.visible = true;
        this.gui.$props.visible = this.visible;
    }

    public hide(): void {
        this.visible = false;
        this.gui.$props.visible = this.visible;
    }

    public toggle(): void {
        this.visible = !this.visible;
        this.gui.$props.visible = this.visible;
    }
}