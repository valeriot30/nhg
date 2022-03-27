<template>
    <div id="roomGui" ref="roomGui">
        <div id="chatBubbleContainer" ref="chatBubbleContainer">
            <div class="chatBubble" v-for="message in this.messages" v-bind:key="message.id" :id="message.id" v-bind:style="{top: message.y + 'px', left: message.x + 'px'}" v-bind:class="message.shout ? 'chatBubbleShout' : ''">
                <div class="chatBubbleContainer">
                <div class="playerHeadContainer">
                    <img src="" />
                    </div>
                    <p>
                        <b>{{ message.author }}:</b> {{ message.text }}
                    </p>
                 </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="js">
    import {
        Draggable
    } from 'draggable-vue-directive'
    //import Engine from '../../../game/Engine';

    export default {
        name: "RoomGui",
        directives: {
            Draggable
        },
        props: ["visible"],
        data() {
            return {
                messages: []
            }
        },
        methods: {
            
        },
        mounted() {
            
        }
    }
</script>