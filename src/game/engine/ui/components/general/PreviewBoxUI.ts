import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import PreviewBoxGUI from "../../../../../components/gui/general/PreviewBoxGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';
import Point from '../../../../utils/point/Point';
import Item from '../../../room/objects/items/Item';
import UiUtils from '../../../../utils/UiUtils';

export default class PreviewBoxUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = false
    private gui: Vue


    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(PreviewBoxGUI))({
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

    public setItem(item: Item) {
        this.gui.$data.item = item;
        this.gui.$data.mode = "item"
        this.gui.$data.image = UiUtils.generateImageFromObject(item.base)?.src;
        this.gui.$forceUpdate();
    }

    public toggle(): void {
        this.visible = !this.visible;
        this.gui.$props.visible = this.visible;
    }

    public get Gui() {
        return this.gui;
    }
}