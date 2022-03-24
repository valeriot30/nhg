<template>
    <div id="avatarContainerGui" ref="avatarContainerGui" v-bind:style="{top: y + 'px', left: x + 'px', height: h + 'px', width: w + 'px'}">
        <img src="~@/assets/images/chat/typing.png" :class="{hidden: !typing}"/>
    </div>
</template>

<script lang="js">

    export default {
        name: "AvatarContainerGui",
        props: ["visible"],
        data() {
            return {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                typing: false
            }
        },
        methods: {
            
        },
        mounted() {
            
        }
    }
</script>