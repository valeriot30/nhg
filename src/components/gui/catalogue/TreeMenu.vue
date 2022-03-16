<template>
  <li class="treeView">
    <div
      v-for="menu in filteredMenu"
      class="catalogLi"
      :class="{ hidden: !menu.isVisible, active: currentMenu.id == menu.id }"
      :key="menu.id"
      @click.stop="openEvent(menu)"
    >
      <div class="description">
        <span class="catalogLiIcon">
          <img
            :src="
              resourceUrl +
              'icon_' +
              menu.iconImage +
              '.png'
            "
          />
        </span>
        <span class="catalogMenuLabel">{{ menu.title }}</span>
      </div>
      <ul class="menuUlCatalog" :class="{ hidden: !menu.openSubMenu }">
        <TreeMenu
          v-if="menu.subPages.length > 0"
          :catalogMenu="menu.subPages"
          :currentMenu="currentMenu"
          :openPage="openPage"
        />
      </ul>
    </div>
  </li>
</template>

<script>
import Engine from '../../../game/Engine';

export default {
  name: "TreeMenu",
  props: ["catalogMenu", "openPage", "currentMenu"],
  data() {
    return {
      openSubMenu: false,
      resourceUrl: Engine.getInstance().getConfig().catalogueResourcesUrl
    };
  },
  methods: {
    openEvent(menu) {
      /*if( menu.openSubMenu == null)
                menu.openSubMenu = false*/
      if (menu.subPages.length > 0) menu.openSubMenu = !menu.openSubMenu;

      this.openPage(menu.id, menu);
    },
  },
  computed: {
    filteredMenu: function () {
      // will return [{status: 'Available'}]
      return this.catalogMenu.filter((menu) => menu.isEnabled !== -1);
    },
  },
};
</script>
