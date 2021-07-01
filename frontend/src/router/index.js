import Vue from 'vue'
import VueRouter from 'vue-router'

import Connexion from '../views/Connexion.vue'
import Info from '../views/Info.vue'
import Profil from '../views/Profil.vue'
import Actuality from '../views/Actuality.vue'
import Friends from '../views/Friends.vue'

import Multimedia from '../components/Multimedia.vue'
import IDMultimedia from '../components/IDMultimedia.vue'

import Agora from '../components/Agora.vue'
import IDAgora from '../components/IDAgora.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: "/Actuality"
  },
  {
    path: '/',
    name: 'Connexion', 
    component: Connexion
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
    redirect: '/Actuality/Multimedia',
    path: '/Actuality',
    name: 'Actuality',
    component: Actuality,
    children: [
      {
        path: 'Multimedia',
        name: "Multimedia",
        component: Multimedia,
      },
      {
        path: "Multimedia/:id",
        name: "IDMultimedia",
        component: IDMultimedia
      },
      {
        path: "Agora",
        name: "Agora",
        component: Agora,
      },
      {
        path: "Agora/:id",
        name: "IDAgora",
        component: IDAgora
      }
    ]
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
