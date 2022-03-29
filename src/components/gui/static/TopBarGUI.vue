<template>
<div class="topBar">
        <div class="coinsBox credits" v-html="credits"></div>
        <div class="coinsBox points" v-html="credits"></div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                credits: 23524
            }
        }
    }
</script>