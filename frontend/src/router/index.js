import Vue from 'vue'
import VueRouter from 'vue-router'

import Connexion from '../views/Connexion.vue'
import Actuality from '../views/Actuality.vue'
import Mypost from '../views/Mypost.vue'
import Favory from '../views/Favory.vue'
import Friends from '../views/Friends.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Connexion', 
    component: Connexion
  },
  {
    path: '/Actuality',
    name: 'Actuality',
    component: Actuality
  },
  {
    path: '/Mypost',
    name: 'Mypost', 
    component: Mypost
  },
  {
    path: '/Favory',
    name: 'Favory', 
    component: Favory
  },
  {
    path: '/Friends',
    name: 'Friends', 
    component: Friends
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
