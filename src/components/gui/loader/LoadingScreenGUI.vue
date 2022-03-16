<template>
    <div class="loaderContainer">
        <div class="loader">
            <div class="logo"></div>
            <div class="progressBar">
                <div v-bind:style="{width: $data.progress}" class="progressStriped"></div>
            </div>
            <div id="progressDescription" class="progressDescription">Attendi, sto caricando...</div>
        </div>
    </div>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class LoadingScreenGUI extends Vue {

        @Prop() progress!: string;

        set progressBar(value: string) {
            this.progress = value
        }
    }
</script>