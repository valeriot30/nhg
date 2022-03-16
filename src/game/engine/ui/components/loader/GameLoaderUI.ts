import Vue from 'vue'
import LoadingScreenGUI from "../../../../../components/gui/loader/LoadingScreenGUI.vue"

import UIComponentManager from "../UIComponentManager"
import IComponentDeletableUI from '../../../../core/ui/IComponentDeletableUI'

class GameLoaderUI implements IComponentDeletableUI {

    private componentManager: UIComponentManager

    private gui: LoadingScreenGUI

    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(LoadingScreenGUI))
        this.updateProgress(0)
    }

    public updateProgress(value: number) : void {
        value = value > 100 ? 100 : value

        this.gui.$data['progress'] = value + '%'
        this.gui.$forceUpdate()

        if (value == 100) {
            this.delete()
        }
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
export default GameLoaderUI