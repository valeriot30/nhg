<template>
    <div class="bottomBar">
        <div class="leftOptions">
            <div class="menuButton avatar">
                <img src="~@/assets/images/bottom-bar/avatar.png" style="width: 100%;"/>
            </div>
            <div class="menuButton navigator" @click="toggle('navigator')">
                <img src="~@/assets/images/bottom-bar/navigator.png" style="width: 75%;"/>
            </div>
            <div class="menuButton catalog" @click="toggle('catalog')">
                 <img src="~@/assets/images/bottom-bar/catalog.png"/>
            </div>
            <div class="menuButton inventory" @click="toggle('inventory')">
                 <img src="~@/assets/images/bottom-bar/inventory.png" style="width: 100%;"/>
            </div>
            <div class="menuButton friends" @click="toggle('friends')">
                 <img src="~@/assets/images/bottom-bar/friends.png" style="width: 95%;"/>
            </div>
        </div>

        <div class="rightOptions">
        </div>
    </div>
</template>

<script>
import Engine from '../../../game/Engine';
import UIComponent from '../../../game/engine/ui/components/UIComponentEnum';

export default {
  name: "BottomBarGUI",
  props: ["visible"],
  data() {

      return {
          isMuted: false,
          shout: false,
          whisper: false,
          isChatBarVisible: false,
          shiftPressed: false,
          message: this.isMuted ? "You are currently muted!" : ""
      }

  },
  methods: {
    toggle(ui) {
        switch(ui) {
            case "navigator":
                Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.NavigatorUI).toggle();
                break;
            case "friends":
                Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.FriendsMenuUI).toggle();
                break;
            case "catalog":
                Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.CatalogueUI).toggle();
                break;
            case "inventory":
                Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.InventoryUI).toggle();
                break;
            case "roominfo":
                Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.RoomInfoUI).toggle();
                break;
        }
    }
  },
  mounted() {
    
      
      

  }
};
</script>