import Vue from 'vue'
import IComponentUI from "../../../../core/ui/IComponentUI"
import UIComponentManager from "../UIComponentManager";
import StaticContainerGUI from "../../../../../components/gui/static/StaticContainerGUI.vue"
import TopBarGUI from "../../../../../components/gui/static/TopBarGUI.vue"
import BottomBarGUI from "../../../../../components/gui/static/BottomBarGUI.vue"

export default class StaticContainerUI implements IComponentUI {

    private componentManager: UIComponentManager
    
    private gui: StaticContainerGUI

    private topBarGUI: TopBarGUI
    private bottomBarGUI: BottomBarGUI

    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(StaticContainerGUI))
        this.topBarGUI = new (Vue.extend(TopBarGUI))
        this.bottomBarGUI = new (Vue.extend(BottomBarGUI))
    }

    public get StaticContainer() {
        return this.gui;
    }

    init(): void {
        this.gui.$mount();
        this.bottomBarGUI.$mount();
        this.topBarGUI.$mount();
        this.componentManager.getRootComponent().appendChild(this.gui.$el)
        this.gui.$el.appendChild(this.bottomBarGUI.$el)
        this.gui.$el.appendChild(this.topBarGUI.$el)
    }

    public get BottomBarGUI() {
        return this.bottomBarGUI;
    }
    public get TopBarGUI() {
        return this.topBarGUI;
    }
    public get Gui() {
        return this.gui
    }
}