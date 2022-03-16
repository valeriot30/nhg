<template>
    <div class="loaderContainer" :class="{ hidden: !visible }">
        <div class="loader">
            <div class="logo"></div>
            <div id="progressDescription" class="progressDescription" v-html="message"></div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "DefaultPanel",
        props: ["visible"],
        data() {
            return {
                message: ""
            }
        }
    }
</script>