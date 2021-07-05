import Vue from 'vue'
import VueRouter from 'vue-router'

import Connexion from '../views/Connexion.vue'
import Info from '../views/Info.vue'
import Profil from '../views/Profil.vue'
import Friends from '../views/Friends.vue'

import Multimedia from '../views/Multimedia.vue'
import IDMultimedia from '../views/MultimediaID.vue'
import Agora from '../views/Agora.vue'
import IDAgora from '../views/AgoraID.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: "/Multimedia"
  },
  {
    path: '/',
    name: 'Connexion', 
    component: Connexion
  },
  {
    path: '/Friends',
    name: 'Friends', 
    component: Friends
  },
  {
    path: "/Info",
    name: "Info",
    component: Info
  },
  {
    path: "/Profil/:id",
    name: "Profil",
    component: Profil
  },
  {
    path: '/Multimedia',
    name: "Multimedia",
    component: Multimedia,
  },
  {
    path: "/Multimedia/:id",
    name: "MultimediaID",
    component: IDMultimedia
  },
  {
    path: "/Agora",
    name: "Agora",
    component: Agora
  },
  {
    path: "/Agora/:id",
    name: "AgoraID",
    component: IDAgora
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
