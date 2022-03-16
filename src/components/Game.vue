<template>
  <div id="gameContainer" ref="game">
    <Login />
    <div v-if="error" class="errorScreen">
      <div class="errorMessage">
        <h1>{{ engine.gameGui.language.errorscreen.title }}</h1>
        <button @click="reloadPage">
          {{ engine.gameGui.language.errorscreen.reload }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="js">

    import Vue from 'vue'
    import Engine from '../game/Engine';
    import Login from "./Login.vue"

    import '@/assets/scss/game.scss'

    export default Vue.extend({
        name: "Game",
        data() {
            return {
                    width: 0,
                    height: 0,
                    sso: "",
                    error: false
                }
        },
        components: {
          Login
        },
        mounted() {
            this.width = document.documentElement.clientWidth
            this.height = document.documentElement.clientHeight
            this.error = false
            this.sso = (window.c_settings && window.c_settings.sso) ? window.c_settings.sso : this.$route.params.sso
            this.loadGame();
            
        },
        methods: {
            reloadPage() {
                window.location.reload()
            },
            loadGame() {      
                this.engine = Engine.getInstance()  

                this.engine.Vue = (this)
                this.engine.SSO = this.sso;

                this.engine.init();
                
                if (this.engine.offlineMode) {
                    this.engine.initGame()
                }
            }
        }
    });
</script>