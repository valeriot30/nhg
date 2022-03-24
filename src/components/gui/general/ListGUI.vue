<template>
    <div id="furniList" :class="{hidden: !visible}" draggable="false">
        <div class="title-bar">
            <div class="closeIcon" @click="hide">&times;</div>
            {{ this.mode == 'user' ? 'Utenti' : 'Furni'}}
        </div>
        <div class="furni-container">
            <ul>
                <li v-for="key in list" :key="key" @click="searchAndOpen(key)">{{ key.toString() }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Engine from '../../../game/Engine'
import UIComponent from '../../../game/engine/ui/components/UIComponentEnum'
export default {
    name: "ListGUI",
    props: ["visible"],
    data() {
        return {
            list: [],
            mode: 'user'
        }
    },
    methods : {
        hide() {
            (Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.FurniListUI)).toggle();
        },
        searchAndOpen(key) {

            if(this.mode == 'furni') {
                let item = Engine.getInstance().getRoomManager().getRoomItemManager().getItemById(key);
                item.Logic.togglePreview();
            }

        }
    }
}
</script>