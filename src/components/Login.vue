<template>
  <div class="container">
    <div class="loginContainer" :class="{ hidden: !visible }">
       <div class="title">LOGIN TO YOUR ACCOUNT</div>
    <div class="errorContainer" v-for="error in errors" :key="error">
      <h1>{{ error }}</h1>
    </div>
    <div class="content">
      <form>
      <input
        type="text"
        placeholder="Enter Username"
        required
        v-model="username"
      />
      <input
        type="password"
        placeholder="Enter Password"
        required
        v-model="password"
      />
      <button @click.prevent="login()">Login</button>
    </form>
    </div>
  </div>
  </div>
</template>

<script>
import Engine from "../game/Engine";
import { OutgoingPacket } from "../game/networking/packets/outgoing/OutgoingPacketEnum";

export default {
  name: "LoginGUI",
  props: ["visible"],
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  mounted() {
    if (Engine.getInstance().offlineMode) {
      this.visible = false
    }
  },
  methods: {
    login() {
      if (this.username == "" || this.password == "") {
        this.errors.push("Invalid username or password");
      } else if (this.username.length > 25 || this.password.length > 30) {
        this.errors.push("Username or password too long");
      } else {
        let message = {
          username: this.username,
          password: this.password,
        };

        Engine.getInstance()
          .getNetworkingManager()
          .getPacketManager()
          .applyOut(OutgoingPacket.LoginRequest, message);
      }
    },
  },
};
</script>