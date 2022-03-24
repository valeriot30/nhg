import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import ListGUI from "../../../../../components/gui/general/ListGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';
import Point from '../../../../utils/point/Point';
import Item from '../../../room/objects/items/Item';

export default class ListUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = false
    private gui: Vue


    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(ListGUI))({
            propsData: {
                visible: this.visible
            }
        });
    }

    public getCanvasContainer() {
        return document.getElementById("roomCanvasContainer")
    }

    public add(element: string) {
        if(this.gui.$data.list.includes(element)) {
            return;
        }
        this.gui.$data.list.push(element);
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