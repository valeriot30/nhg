<template>
    <div id="roomInfo" ref="roomInfo" :class="{hidden: !visible}" v-draggable="dragBox">
        <div class="title-bar" ref="handler">
            <div class="title">Nome stanza</div>
            <div class="closeIcon" @click="close()"></div>
        </div>
        <div class="roomInfoContainer">
            <div class="roomInfoContainerBg">
                <div class="roomInfoDiv">
                    <div class="roomInfoLabel">Proprietario</div>
                    <div class="roomInfoValue" id="roomInfoValueOwnerName">Shokato</div>
                    <hr>
                </div>
                <div class="roomInfoDiv">
                    <div class="roomInfoDescription" id="roomInfoValueDescription">Descrizione</div>
                </div>
                <div class="roomInfoDiv infoCButton">
                    <button id="roomInfoSettingsButton" class="ui-button small" :class="{hidden: !showSettingButton}"
                        @click="openSettings()">Impostazioni</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Draggable
    } from 'draggable-vue-directive'
    import { OutgoingPacket } from '../../../game/networking/packets/outgoing/OutgoingPacketEnum';
    import Engine from '../../../game/Engine'
    import UIComponent from '../../../game/engine/ui/components/UIComponentEnum';

    export default {
        name: "RoomInfoGui",
        props: [
            'engine',
            'visible'
        ],
        directives: {
            Draggable,
        },
        data() {
            return {
                dragBox: {
                    handle: undefined,
                    onDragStart: () => {
                        //Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.RoomInfoUI).show()
                    }
                },
                owner: "test",
                description: "test",
                roomName: "test",
                showSettingButton: true
            }
        },
        methods: {
            openSettings() {
                if (Engine.getInstance().getRoomManager().CurrentRoom != null) {
                    const message = {
                        roomId: Engine.getInstance().getRoomManager().CurrentRoom.Id
                    }

                    Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.RequestRoomSettingsEvent, message)

                    Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.RoomEditInfoUI).show()
                }
            },
            close() {
                Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.RoomInfoUI).hide()
            }
        },
        mounted() {
            this.dragBox.handle = this.$refs.handler;

            // this.openPacket();
        }
    }
</script>