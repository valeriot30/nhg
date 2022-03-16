import Vue from 'vue'
import DefaultPanelGUI from "../../../../../components/gui/panel/DefaultPanel.vue"

import UIComponentManager from "../UIComponentManager"
import IComponentDeletableUI from '../../../../core/ui/IComponentDeletableUI'

class DefaultPanel implements IComponentDeletableUI {

    private componentManager: UIComponentManager

    private visible: boolean = false;

    private gui: DefaultPanelGUI

    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.visible = false;

        this.gui = new (Vue.extend(DefaultPanelGUI))({
            propsData: {
                visible: this.visible
            }
        });
    }

    public set(message: string) {
        this.gui.$props['visible'] = true;
        this.gui.$data['message'] = message;
        this.gui.$forceUpdate();
    }

    public init(): void {
        this.gui.$mount();
        this.componentManager.getRootComponent().appendChild(this.gui.$el)
    }

    public delete(): void {
        //fade
        setTimeout(() => {
            this.gui.$el.remove()
        }, 1000)
    }

}
export default DefaultPanel