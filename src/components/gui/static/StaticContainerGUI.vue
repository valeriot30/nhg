<template>
    <div id="staticContainer">
        <div class="bubbleAlertContainer">
            <!--<div class="bubbleAlert">
                <img src="~@/assets/images/bottom-bar/avatar.png"/>
                Kaost si è appena connesso
            </div>!-->    
        </div>    
        <div class="chatBar">
            <input type="text" class="chatInput" autofocus :disabled="this.isMuted"  v-bind:class="{ muted: this.isMuted, hidden: !this.isChatBarVisible }" ref="chatBarInput" placeholder="Type here to talk!" v-model="message" v-on:keyup.enter="sendMessage">
        </div>
    </div>
</template>

<script>
import Engine from '../../../game/Engine';

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
            sendMessage(e) {

                let shout = false;

                if(e.shiftKey) {
                    shout = true;
                }
                Engine.getInstance().GameEnvironment.ChatManager.computeMessage(this.message, shout)
                this.resetChatMessage();

            },
            resetChatMessage() {
                this.message = "";
            }
        }
    }
</script>