<template>
    <div id="furniList" :class="{hidden: !visible}" draggable="false">
        <div class="title-bar">
            <div class="closeIcon" @click="hide">&times;</div>
            Furni
        </div>
        <div class="furni-container">
            <ul>
                <li v-for="[key] in items" :key="key" @click="searchAndOpen(key)">{{ key }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Engine from '../../../game/Engine'
import UIComponent from '../../../game/engine/ui/components/UIComponentEnum'
export default {
    name: "FurniListGUI",
    props: ["visible"],
    data() {
        return {
            items: null
        }
    },
    methods : {
        hide() {
            (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.FurniListUI)).toggle();
        },
        searchAndOpen(key) {

            let item = Engine.getInstance().getRoomManager().getRoomItemManager().getItemById(key);
            item.Logic.togglePreview();

        }
    }
}
</script>