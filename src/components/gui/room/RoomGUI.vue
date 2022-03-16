<template>
    <div id="roomGui" ref="roomGui" v-draggable="dragBox">

        <div id="chatBubbleContainer" @click="sendMessage()" ref="chatBubbleContainer">
        </div>

        <div id="itemIcon" ref="itemIcon" :class="{hidden: !showIcon}"></div>
        <div class="roomObjectsContainer" ref="roomObjectsContainer">
            <div id="roomCanvasContainer" style="position: absolute;" ref="roomCanvasContainer">
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
                dragBox: {
                    onPositionChange: this.onPosChanged,
                    resetInitialPos: false
                },
                leftOffset: 0,
                topOffset: 0,
                showIcon: false,
                message: ""
            };
        },
        methods: {
            onPosChanged(positionDiff, absolutePosition) {
                if (absolutePosition == null)
                    return;
                /*
                this.leftOffset = absolutePosition.left;
                this.topOffset = absolutePosition.top;*/
            }
        },
        mounted() {
            //todo move room to cenetr
            //Engine.getInstance()
        }
    }
</script>