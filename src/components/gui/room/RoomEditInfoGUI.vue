<template>
    <div id="roomEditInfo" ref="roomEditInfo" :class="{hidden: !visible}" v-draggable="dragBox" draggable="false">
        <div class="title-bar" ref="handler">
            <div class="title">Titolo</div>
            <div class="closeIcon" @click="close()"></div>
        </div>
        <div class="RoomEditInfoContainer">
            <div class="RoomEditInfoContainerBg">
                <div class="roomEditInfoTabs">
                    <div class="tab" :class="{ active: currentTab == 'basic' }" @click="changeTab('basic')">
                        Basic
                    </div>
                    <div class="tab" :class="{ active: currentTab == 'rights' }" @click="changeTab('rights')">
                        Rights
                    </div>
                </div>
                <div class="tabContainer" v-if="currentTab == 'basic'">
                    <ul id="roomInfoEditContainer" class="settingsRoomPanel">
                        <label for="roomeditname">Room Edit Name</label>
                        <input type="text" name="roomeditname" id="roomeditname"
                            placeholder="Stanza"
                            v-model="roomName">
                        <label for="roomeditdesc">Descrizione</label>
                        <textarea name="roomeditdesc" id="roomeditdesc"
                            placeholder="Descrizione"
                            cols="40" rows="5" v-model="roomDesc"></textarea>

                        <label for="roomeditmaxusers">Utenti Max</label>
                        <select id="roomeditmaxusers" v-model="roomMaxUsers">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <div>
                            <input type="checkbox" id="roomallowwalkthrough" name="roomallowwalkthrough" value="true"
                                v-model="roomWalkThrough">
                            <label
                                for="roomallowwalkthrough">Blocco caselle</label>
                        </div>
                    </ul>
                </div>
                <div class="tabContainer" v-if="currentTab == 'rights'">
                    <select id="roomRightsEditContainer" multiple="multiple" v-model="rightsSelectUsers">
                        <option :value="rUser.id" v-for="rUser in rightsList" :key="rUser.id">Nome</option>
                    </select>
                    <div id="roomRightsButtons">
                        <div class="ui-button small" id="removeRightsInfoEditButton" @click="saveRights" v-if="rightsSelectUsers != null && rightsSelectUsers != ''">
                            Togli i diritti</div>
                    </div>
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
        name: "RoomEditInfoGui",
        props: [
            'engine',
            'visible'
        ],
        watch: {
            roomName: function (val) {
                clearTimeout(this.typingTimer);

                if (val != "") {
                    this.typingTimer = setTimeout(this.saveRoomInfo, this.doneTypingInterval);
                }
            },
            roomDesc: function (val) {
                clearTimeout(this.typingTimer);

                if (val != "") {
                    this.typingTimer = setTimeout(this.saveRoomInfo, this.doneTypingInterval);
                }
            },
            roomMaxUsers: function () {
                this.saveRoomInfo();
            },
            roomWalkThrough: function () {
                this.saveRoomInfo();
            }
        },
        directives: {
            Draggable,
        },
        data() {
            return {
                dragBox: {
                    handle: undefined,
                    onDragStart: () => {
                        // this.engine.gameGui.roomEditInfo.show();
                    }
                },
                currentTab: "basic", // basic-rights
                rightsList: [],
                roomName: "",
                roomDesc: "",
                roomMaxUsers: 50,
                roomWalkThrough: true,
                rightsSelectUsers: [],
                typingTimer: null,
                doneTypingInterval: 1500
            }
        },
        methods: {
            saveRights() {
                this.rightsSelectUsers.forEach((user) => {

                    let message = {
                        userId: user
                    }

                    Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.RoomUserRemoveRightsEvent, message)
                })
            },

            changeTab(tab) {
                this.currentTab = tab;
            },

            saveRoomInfo() {
                if (Engine.getInstance().getRoomManager().CurrentRoom == null)
                    return;

                this.typingTimer = null

                let message = {
                    room_id: Engine.getInstance().getRoomManager().CurrentRoom.id,
                    room_name: this.roomName,
                    room_desc: this.roomDesc,
                    room_maxusers: this.roomMaxUsers,
                    room_allowwalk: this.roomWalkThrough
                }

                Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.SaveRoomSettingsEvent, message)
            },
            close() {
                Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.RoomEditInfoUI).hide()
            }
        },
        mounted() {
            this.dragBox.handle = this.$refs.handler;
        }
    }
</script>
