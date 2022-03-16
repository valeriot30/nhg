<template>
<div class="topBar">
        <div class="coinsBox credits" v-html="credits"></div>
        <div class="coinsBox points">521152</div>
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