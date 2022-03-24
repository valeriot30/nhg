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
                this.$emit("user-start-typing")
            },
            sendMessage(e) {

                let shout = false;

                if(e.shiftKey) {
                    shout = true;
                }
                Engine.getInstance().GameEnvironment.ChatManager.computeMessage(this.message, shout)
                this.$emit('user-stop-typing');
                this.resetChatMessage();

            },
            resetChatMessage() {
                this.message = "";
            }
        },
        mounted() {
            setInterval(() => {
                if(this.message === "") {
                    this.$emit('user-stop-typing');
                }
            }, 100)
        }
    }
</script>