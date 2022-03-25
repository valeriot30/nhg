<template>
    <div id="staticContainer">
        <div class="bubbleAlertContainer">
            <!--<div class="bubbleAlert">
                <img src="~@/assets/images/bottom-bar/avatar.png"/>
                Kaost si è appena connesso
            </div>!-->    
        </div>    
        <div class="chatBar">
            <input type="text" class="chatInput" autofocus :disabled="this.isMuted"  v-bind:class="{ muted: this.isMuted, hidden: !this.isChatBarVisible }" ref="chatBarInput" placeholder="Type here to talk!" v-model="message" v-on:keyup.enter="sendMessage" v-on:keydown="startTyping">
        </div>
    </div>
</template>

<script>
import Engine from '../../../game/Engine';
import { OutgoingPacket } from '../../../game/networking/packets/outgoing/OutgoingPacketEnum';

    export default {
        data() {

            return {
                isMuted: false,
                shout: false,
                whisper: false,
                isChatBarVisible: false,
                shiftPressed: false,
                message: this.isMuted ? "You are currently muted!" : ""
            }

        },
        methods: {
            startTyping() {
                Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.UserTypeStatus, {
                    roomId: Engine.getInstance().RoomsManager.CurrentRoom.Id,
                    typing: true
                })
            },
            sendMessage(e) {

                let shout = false;

                if(e.shiftKey) {
                    shout = true;
                }
                Engine.getInstance().GameEnvironment.ChatManager.computeMessage(this.message, shout)
                Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.UserTypeStatus, {
                    roomId: Engine.getInstance().RoomsManager.CurrentRoom.Id,
                    typing: false
                })
                this.resetChatMessage();

            },
            resetChatMessage() {
                this.message = "";
            }
        },
        mounted() {
            setInterval(() => {
                if(this.message === "") {
                    if(Engine.getInstance().RoomsManager) {
                        return;
                    }
                    Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.UserTypeStatus, {
                        roomId: Engine.getInstance().RoomsManager.CurrentRoom.Id,
                        typing: false
                    })
                }
            }, 100)
        }
    }
</script>