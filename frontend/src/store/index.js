import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  
  },
  actions: {
    neo: function(){

      let neo = document.querySelectorAll(".neo")
      for (let i= 0; i < neo.length; i++) {
        let color1 = "#bebebe"
        let color2= "#ffffff"
        let L = neo[i].offsetWidth
        let H = neo[i].offsetHeight
        neo[i].style.zIndex = "10"
        neo[i].style.borderRadius = `${((L + H)/2)/4}px`
        if(L > H){
            neo[i].style.boxShadow = `${(L/10)*(H/L)}px ${(L/10)*(H/L)}px ${(L/10)*((H/L)*2)}px ${color1}, ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*2)}px ${color2}`
        } else {
            neo[i].style.boxShadow = `${(H/10)*(L/H)}px ${(H/10)*(L/H)}px ${(H/10)*((L/H)*2)}px ${color1}, ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*2)}px ${color2}`
        }
      }

    },

    accessPage: function(){
  
      const userId = localStorage.getItem("userId")

      if (userId !== null) {

        axios.post('http://localhost:3000/api/access', {userId: userId})
        .then(() => {

        })
        .catch(() => {
          router.push({name: 'Connexion'})
        })

      } else {

        router.push({name: 'Connexion'})

      }
    }

  },
  modules: {
  }
})
