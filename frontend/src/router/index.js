import Vue from 'vue'
import VueRouter from 'vue-router'

import Connexion from '../views/Connexion.vue'
import Actuality from '../views/Actuality.vue'
import Mypost from '../views/Mypost.vue'
import Favory from '../views/Favory.vue'
import Friends from '../views/Friends.vue'
import Account from '../views/Account.vue'

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
    redirect: '/Mypost/Multimedia',
    path: '/Mypost',
    name: 'Mypost', 
    component: Mypost,
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
    path: '/Favory',
    name: 'Favory', 
    component: Favory
  },
  {
    path: '/Friends',
    name: 'Friends', 
    component: Friends
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
