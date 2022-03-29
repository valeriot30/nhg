<template>
  <div
    id="navigator"
    ref="navigator"
    :class="{ hidden: !visible }"
    v-draggable="dragBox"
    draggable="false"
  >
    <div class="titleBar" ref="handler">
      <div class="titleBarBg">
        <div class="title">Navigatore</div>
      </div>
      <div class="closeIcon" @click="hide">&times;</div>
    </div>
    <div class="content">
      <div class="searchContainer">
        <img
          src="https://cdn.discordapp.com/attachments/799750747281031228/800333126395232266/btn_search.png"
        />
        <input
          type="text"
          class="searchInput"
          placeholder="Type here the name of the room you want to search"
        />
      </div>
      <div class="roomContainer">
        <div class="roomContainerBg">
          <div class="navigatorTabs">
            <div
              class="tab"
              :class="{ active: currentTab == 'public' }"
              @click="changeTab('public')"
            >
              Pubbliche
            </div>
            <div
              class="tab"
              :class="{ active: currentTab == 'all' }"
              @click="changeTab('all')"
            >
              Stanze
            </div>
            <div
              class="tab"
              :class="{ active: currentTab == 'my' }"
              @click="changeTab('my')"
            >
              Mie
            </div>
          </div>
          <div class="roomsListContainer">
            <ul
              class="easyRoomsListUl"
              v-if="currentTab == 'my' || currentTab == 'all'"
            >
              <li
                class="roomLi"
                v-for="room in rooms"
                :key="room.id"
                v-on:click="enterRoom(room.id)"
              >
                <span class="title">{{ room.name }}</span>
                <div class="icons_container">
                  <div
                    class="usersNowRoom"
                    :class="{
                      navigatorRoomFull: room.usersnow >= room.maxusers,
                      greenIcon:
                        room.usersnow > 0 && room.usersnow < room.maxusers,
                    }"
                  >
                    {{ room.usersnow }}
                  </div>
                </div>
              </li>
            </ul>

            <ul class="roomsListUl" v-else>
              <li
                class="roomLi"
                v-for="room in rooms"
                :key="room.id"
                v-on:click="enterRoom(room.id)"
              >
                <div
                  v-if="
                    room.type == 'public' ||
                    room.type == 'all' ||
                    room.type == 'my'
                  "
                >
                  <div class="roomInfoPreview">
                    <div class="roomPreview">
                      <img src="@/assets/images/room/roomPreview.png" />
                    </div>
                    <div
                      class="usersNowRoom"
                      :class="{
                        navigatorRoomFull: room.usersnow >= room.maxusers,
                      }"
                    >
                      {{ room.usersnow }}
                    </div>
                  </div>
                  <div class="roomInfo">
                    <span class="title">{{ room.name }}</span>
                    <p>{{ room.owner }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button type="submit" class="navigatorBtn newRoom" @click="createRoom()">
        Nuova Stanza
      </button>
      <button type="submit" class="navigatorBtn randomRoom">
        Stanza Casuale
      </button>
    </div>
  </div>
</template>

<script>
import { Draggable } from "draggable-vue-directive";
import Engine from "../../../game/Engine";
import UIComponent from "../../../game/engine/ui/components/UIComponentEnum";
import { OutgoingPacket } from "../../../game/networking/packets/outgoing/OutgoingPacketEnum";

export default {
  name: "NavigatorGui",
  props: ["visible"],
  directives: {
    Draggable,
  },
  data() {
    return {
      dragBox: {
        handle: undefined,
        onDragStart: () => {},
      },
      currentTab: "public",
      rooms: [],
    };
  },
  methods: {
    createRoom() {
      let createRoomUI = Engine.getInstance()
        .userInterfaceManager
        .getUIComponentManager()
        .getComponent(UIComponent.CreateRoomUI);
      createRoomUI.toggle();
    },
    enterRoom(roomId) {
      this.hide();
      Engine.getInstance()
        .networkingManager
        .getPacketManager()
        .applyOut(OutgoingPacket.UserEnterRoom, {
          id: roomId,
        });
      this.changeTab(this.currentTab);
    },

    openPacket() {
      return Engine.getInstance()
        .userInterfaceManager
        .getPacketManager()
        .applyOut(OutgoingPacket.NavigatorPublicRooms);
    },

    changeTab(tab) {
      switch (tab) {
        case "public":
          this.currentTab = tab;
          Engine.getInstance()
            .networkingManager
            .getPacketManager()
            .applyOut(OutgoingPacket.NavigatorPublicRooms);
          break;
        case "my":
          this.currentTab = tab;
          Engine.getInstance()
            .networkingManager
            .getPacketManager()
            .applyOut(OutgoingPacket.NavigatorMyRooms);
          break;
        case "all":
          this.currentTab = tab;
          Engine.getInstance()
            .networkingManager
            .getPacketManager()
            .applyOut(OutgoingPacket.NavigatorAllRooms);
          break;
      }
    },
    hide() {
      return Engine.getInstance()
        .userInterfaceManager
        .getUIComponentManager()
        .getComponent(UIComponent.NavigatorUI)
        .hide();
    },
  },
  mounted() {
    this.dragBox.handle = this.$refs.handler;
  },
  mount() {
    this.openPacket();
  },
};
</script>
