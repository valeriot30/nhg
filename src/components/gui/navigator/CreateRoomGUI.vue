<template>
  <div
    id="createRoomGui"
    ref="createRoom"
    :class="{ hidden: !visible }"
    v-draggable="dragBox"
  >
    <div class="titleBar" ref="handler">
      <div class="titleBarBg">
        <div class="title">Crea Room</div>
      </div>
      <div class="closeIcon" @click="this.toggle()">
        X
      </div>
    </div>
    <div class="createRoomContainer">
      <h2>Scegli modello</h2>
      <div class="roomGrid">
        <div
          class="roomDiv"
          v-for="room in this.roomModels"
          :key="room.id"
          @click="selectModel(room.id)"
          :class="{ selected: selectedModel == room.id }"
        >
          <img :src="getRoomImage(room.name)" :alt="room.name" />
          <div class="tile_count">
            <img src="@/assets/images/createroom/tile_icon_black.png" />
            <span
              >{{ room.tileCount }}
              Tiles</span
            >
          </div>
        </div>
      </div>
      <div class="roomInfo">
        <h2>Nome</h2>
        <input
          maxlength="50"
          type="text"
          placeholder="Nome"
          v-model="roomName"
          :class="{ error: errorCreate }"
        />
        <div class="button_container">
          <button @click="checkAndCreateRoom()">
            Crea
          </button>
          <button @click="this.toggle()">
            Cancella
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Engine from '../../../game/Engine';
import UIComponent from '../../../game/engine/ui/components/UIComponentEnum';
import { OutgoingPacket } from '../../../game/networking/packets/outgoing/OutgoingPacketEnum';
import { Draggable } from "draggable-vue-directive";

export default {
    name: "CreateRoomGUI",
    props: ["visible"],
    directives: {
      Draggable
    },
    data() {
      return {
         dragBox: {
            handle: undefined,
            onDragStart: () => {
              this.engine.gameGui.createRoomGui.show();
            }
          },
        roomModels: [
        { tileCount: 104, name: "model_a", id: 2 },
        { tileCount: 94, name: "model_b", id: 3 },
        { tileCount: 36, name: "model_c", id: 4 },
        { tileCount: 84, name: "model_d", id: 5 },
        { tileCount: 80, name: "model_e", id: 6 },
        { tileCount: 80, name: "model_f", id: 7 },
        { tileCount: 80, name: "model_g", id: 8 },
        { tileCount: 74, name: "model_h", id: 9 },
        { tileCount: 416, name: "model_i", id: 10 },
        { tileCount: 320, name: "model_j", id: 11 },
        { tileCount: 448, name: "model_k", id: 12 },
        { tileCount: 352, name: "model_l", id: 13 },
        { tileCount: 384, name: "model_m", id: 14 },
        { tileCount: 372, name: "model_n", id: 15 },
        { tileCount: 416, name: "model_o", id: 16 },
        { tileCount: 352, name: "model_p", id: 17 },
        { tileCount: 304, name: "model_q", id: 18 },
        { tileCount: 336, name: "model_r", id: 19 },
        { tileCount: 540, name: "model_t", id: 20 },
        { tileCount: 748, name: "model_u", id: 21 },
        { tileCount: 438, name: "model_v", id: 22 },
        { tileCount: 512, name: "model_w", id: 23 },
        { tileCount: 396, name: "model_x", id: 24 },
        { tileCount: 440, name: "model_y", id: 25 },
        { tileCount: 456, name: "model_z", id: 26 },
        { tileCount: 208, name: "model_0", id: 1 },
      ],
        selectedModel: 1,
        roomName: "",
        errorCreate: ""
      }
    },
    methods: {
        getRoomImage(id) {
            return require("@/assets/images/createroom/" + id + ".png");
        },
        selectModel(id) {
          this.selectedModel = id;
        },
        checkAndCreateRoom() {
          this.errorCreate = false;

          if (this.roomName == "" || /^\s*$/.test(this.roomName)) {
            this.errorCreate = true;
            this.roomName = "";
          }

          let body =  {
          room_name: this.roomName,
          room_desc: "",
          room_maxusers: 20,
          room_preview: this.selectedModel,
          room_mold: this.selectedModel
          }

          
          Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.CreateNewRoom, body);
          
          this.roomName = "";
          this.selectedModel = "model_a";
          this.toggle();

        },
        toggle() {
          Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.CreateRoomUI).toggle();
        }


    },
    mounted() {
       this.dragBox.handle = this.$refs.handler;
    }
}
</script>

