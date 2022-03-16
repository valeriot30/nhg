import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import FurniListGUI from "../../../../../components/gui/general/FurniListGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';
import Point from '../../../../utils/point/Point';
import Item from '../../../room/objects/items/Item';

export default class FurniListUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = false
    private gui: Vue


    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(FurniListGUI))({
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

    public setItems(items: Map<string, Item>) {
        this.gui.$data.items = items;
        this.gui.$forceUpdate();
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