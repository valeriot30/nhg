import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import InventoryGUI from "../../../../../components/gui/inventory/InventoryGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';
import Item from '../../../room/objects/items/Item';
import FloorItem from '../../../room/objects/items/FloorItem';
import Engine from '../../../../Engine';
import { OutgoingPacket } from '../../../../networking/packets/outgoing/OutgoingPacketEnum';
import WallItem from '../../../room/objects/items/WallItem';

export default class InventoryUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = false
    private gui: Vue


    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(InventoryGUI))({
            propsData: {
                visible: this.visible
            }
        });
    }
    public init(): void {
        this.gui.$mount();
        this.componentManager.getRootComponent().appendChild(this.gui.$el)
    }

    public addItem(item: Item) {

        let list = item instanceof WallItem ? this.gui.$data.wallItems : this.gui.$data.floorItems;

        if(list.some((data: { id: number; }) => data.id === parseInt(item.id))){
            return;
        }
        
        list.push(item)
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
        if(!this.visible) Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.RequestInventoryItemsEvent);
        
        this.visible = !this.visible;
        this.gui.$props.visible = this.visible;
    }
}