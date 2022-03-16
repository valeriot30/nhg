import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Game Client',
      component: Game
    },
    {
      path: '/sso/:sso',
      name: 'Game Client with SSO',
      component: Game
    }
  ]
})
