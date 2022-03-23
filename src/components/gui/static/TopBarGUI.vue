<template>
<div class="topBar">
        <div class="coinsBox" v-html="credits"></div>
        <div class="coinsBox" v-html="credits"></div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                credits: 0
            }
        }
    }
</script>