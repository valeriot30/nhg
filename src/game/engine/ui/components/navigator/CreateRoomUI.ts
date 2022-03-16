import Vue from "vue";
import IComponentShowableUI from "../../../../core/ui/IComponentShowableUI";
import UIComponentManager from "../UIComponentManager";
import CreateRoomGUI from "../../../../../components/gui/navigator/CreateRoomGUI.vue"

export default class CreateRoomUI implements IComponentShowableUI {
    private componentManager: UIComponentManager

    public visible: boolean = false
    private gui: Vue


    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(CreateRoomGUI))({
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
}