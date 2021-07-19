import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from "axios"
import VuejsDialog from 'vuejs-dialog';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

//! Chaque requête Axios commence par ce début d'URL (par défaut)
axios.defaults.baseURL = 'http://localhost:3000/api/'

//! Fonction qui permet de récupérer le token
function getToken() {
  if(sessionStorage.getItem("token") == null && localStorage.getItem("token") !== null ){
    return localStorage.getItem("token")
  } else if (localStorage.getItem("token") == null && sessionStorage.getItem("token") !== null){
    return sessionStorage.getItem("token")
  } else {
    return undefined
  }
}

//! Dans chaque requêtes, on fixe automatiquement le token d'authentification obtenu lors de la connnexion
const token = getToken()

if(token !== null && token !== undefined && token !== ""){
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

Vue.use(VuejsDialog, {
  html: true,
  loader: true,
  okText: 'Oui',
  cancelText: 'Non',
  animation: 'bounce'
})

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
