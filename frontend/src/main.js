import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from "axios"

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

axios.defaults.baseURL = 'http://localhost:3000/api/'

const token = localStorage.getItem("token")

if(token !== null){
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
