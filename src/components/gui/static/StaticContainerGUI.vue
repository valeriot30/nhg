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
                typing: false,
                isChatBarVisible: false,
                shiftPressed: false,
                message: this.isMuted ? "You are currently muted!" : ""
            }

        },
        methods: {
            startTyping() {
                if(!this.typing) {
                    Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.UserTypeStatus, {
                        roomId: Engine.getInstance().RoomsManager.CurrentRoom.Id,
                        typing: true
                    })
                    this.typing = true;
                }
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

                this.typing = false;

                this.resetChatMessage();

            },
            resetChatMessage() {
                this.message = "";
            }
        },
        mounted() {
            window.setInterval(() => {
                if(this.message === "" && this.typing) {
                    if(!Engine.getInstance().RoomsManager || !Engine.getInstance().RoomsManager.CurrentRoom) {
                        return;
                    }

                    console.log('aa');
                    Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.UserTypeStatus, {
                        roomId: Engine.getInstance().RoomsManager.CurrentRoom.Id,
                        typing: false
                    })
                    this.typing = false;
                    //clearInterval(100)
                }
            }, 100)
        }
    }
</script>