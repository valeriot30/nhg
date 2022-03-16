import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import RoomEditInfoGUI from "../../../../../components/gui/room/RoomEditInfoGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';

export default class RoomEditInfoUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = false
    private gui: Vue

    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(RoomEditInfoGUI))({
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

    public setRoomName(roomName: string) {
        this.gui.$data.roomName = roomName
    }

    public setDescription(description: string) {
        this.gui.$data.roomDesc = description
    }

    public setMaxUsers(maxUsers: number) {
        this.gui.$data.roomMaxUsers = maxUsers
    }

    public setAllowWalkthrough(allowWalkthrough: boolean) {
        this.gui.$data.roomWalkThrough = allowWalkthrough
    }
}