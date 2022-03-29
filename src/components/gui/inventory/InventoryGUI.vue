<template>
    <div id="inventory" ref="inventory" :class="{hidden: !visible, tradeMode: tradeMode}" v-draggable="dragBox" draggable="false">
        <div class="title-bar" ref="handler">
            <div class="title">Inventario</div>
            <div class="closeIcon" @click="hide()"></div>
        </div>
        <div class="inventoryContainer" v-on:click="deselectItem">
            <div class="inventoryContainerBg">
                <div class="inventoryTabs">
                    <div class="tab" :class="{ active: currentTab == 'floor' }" @click.stop="changeTab('floor')">
                        Pavimento
                    </div>
                    <div class="tab" :class="{ active: currentTab == 'wall' }" @click.stop="changeTab('wall')">
                        Muro
                    </div>
                </div>
                <div class="inventoryListAndButtonsContainer">

                    <div class="listContainer itemsContainer" v-if="currentTab == 'floor'">
                        <div class="itemInventory"
                            :class="{selected: selectedItem && selectedItem.Id == item.Id}"
                            v-for="item in floorItems" @click.stop="selectItem(item)" v-bind:key="item.Id">
                            <img v-bind:src="'dasd'" :alt="item.Name" />
                            <span class="stackSize">{{ item.qty }}</span>
                        </div>
                    </div>
                    <div class="listContainer itemsContainer" v-if="currentTab == 'wall'">
                        <div class="itemInventory"
                            :class="{selected: selectedItem && selectedItem.Id == item.Id}"
                            v-for="item in wallItems" @click.stop="selectItem(item)" v-bind:key="item.Id">
                            <img :src="item.icon" :alt="item.Name" />
                            <span class="stackSize">{{ item.qty }}</span>
                        </div>
                    </div>
                    <div class="buttonsContainer">
                        <div class="itemPreivew">
                            <img v-if="selectedItem"
                                v-bind:src="generatePreview()" />
                        </div>
                        <div class="ui-button small" :class="{hidden: !showPlaceItemButton}" ref="PlaceItemButton"
                            @click.stop="placeItem">Posiziona</div>
                        <div class="ui-button small" :class="{hidden: !showAddItemToTradeButton}"
                            ref="AddItemToTradeButton" @click.stop="addItemToTrade">
                            Scambia</div>
                        <div class="ui-button small" :class="{hidden: !showAddAllItemsToTradeButton}"
                            ref="AddAllItemsToTradeButton" @click.stop="addAllItemsToTrade">
                            Scambia</div>
                    </div>
                </div>
                <div class="tradeContainer" :class="{hidden: !tradeMode}">
                    <div class="trade-container">
                        <div>
                            <span>La tua offerta</span>
                            <ul id="mytradeitems" ref="mytradeitems" class="itemsContainer">
                                <div class="itemInventory" v-for="item in myTradeItems" v-bind:key="item.id">
                                    <img :src="item.icon" :alt="item.name" />
                                    <span class="stackSize">{{ item.qty }}</span>
                                </div>
                            </ul>
                        </div>
                        <div>
                            <button id="acceptTradeButton" class="tradeButton"
                                v-on:click.stop="acceptTrade">Accetta</button>
                            <button id="declineTradeButton" class="tradeButton"
                                v-on:click.stop="cancelTrade">Rifiuta</button>
                        </div>
                        <div>
                            <span id="targetTradeName">{{ trade.targetTradeName }}</span>
                            <div id="targettradeitems" ref="targettradeitems" class="itemsContainer">
                                <div class="itemInventory" v-for="item in targetTradeItems" v-bind:key="item.id">
                                    <img :src="item.icon" :alt="item.name" />
                                    <span class="stackSize">{{ item.qty }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Draggable } from "draggable-vue-directive";
    import Engine from "../../../game/Engine";
    import UIComponent from "../../../game/engine/ui/components/UIComponentEnum";
import { OutgoingPacket } from '../../../game/networking/packets/outgoing/OutgoingPacketEnum';
    //import UiUtils from '../../../game/utils/UiUtils';
    export default {
        name: "InventoryGui",
        props: [
            'visible'
        ],
        directives: {
            Draggable,
        },
        data() {
            return {
                dragBox: {
                    handle: undefined,
                    onDragStart: () => {}
                },
                currentTab: 'floor', //floor - wall
                showPlaceItemButton: false,
                showAddItemToTradeButton: false,
                showAddAllItemsToTradeButton: false,
                tradeMode: false,
                selectedItem: null,
                trade: {
                    targetTradeName: "test"
                },
                myTradeItems: [

                ],
                targetTradeItems: [

                ],
                floorItems: [],
                wallItems: []
            }
        },
        methods: {
            deselectItem() {
                

            },
            placeItem() {
                
            },
            addItemToTrade() {
                
            },
            addAllItemsToTrade() {
                //todo not implemented yet (PLANNED)
            },
            changeTab(tab) {
                switch (tab) {
                    case 'floor':
                        this.currentTab = tab;
                        break;
                    case 'wall':
                        this.currentTab = tab;
                        break;
                }

                this.showPlaceItemButton = false
            },
            openPacket() {
                Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.RequestInventoryItemsEvent)
            },
            acceptTrade() {
                
            },
            cancelTrade() {
                
            },
            selectItem(item) {
               this.selectedItem = item;

                if(Engine.getInstance().RoomsManager.CurrentRoom != undefined) {
                    this.showPlaceItemButton = true;
                }
            },
            hide() {
                Engine.getInstance()
                    .userInterfaceManager
                    .getUIComponentManager()
                    .getComponent(UIComponent.InventoryUI)
                    .hide();
            },
            generatePreview() {
                return "adasdas"
            }
        },
        mounted() {
            this.dragBox.handle = this.$refs.handler;
        },


    }
</script>
