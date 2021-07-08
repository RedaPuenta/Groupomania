import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //! Variables (composant Error)
    errorAlert: false,
    errorText: "",
    //! Variables (fonction Neo)
    color1: "#bebebe",
    color2: "#ffffff",
    color3: '#e0e0e0',
    time: 0.8
  },
  getters: {
  },
  mutations: {
    //! Masquer l'erreur (composant Error)
    DESACTIVE_ERROR: function(state){
      state.errorAlert = false
      state.errorText = ""
    },
    //! Afficher l'erreur (composant Error)
    ACTIVE_ERROR: function(state, text){
      state.errorAlert = true
      state.errorText = text
    },

  },
  actions: {
    //! Fonction Neo
    neo: function(context){
      
      const neo = document.querySelectorAll(".neo")
      for (let i= 0; i < neo.length; i++) {
          
        const L = neo[i].offsetWidth
        const H = neo[i].offsetHeight
        neo[i].style.transition = `box-shadow ${context.state.time}s ease-in-out`
        
        if(L > H){
          neo[i].style.boxShadow = 
          `${(L/10)*(H/L)}px ${(L/10)*(H/L)}px ${(L/10)*((H/L)*2)}px ${context.state.color1}, 
          ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*2)}px ${context.state.color2}`
            
        } else {
          neo[i].style.boxShadow = 
          `${(H/10)*(L/H)}px ${(H/10)*(L/H)}px ${(H/10)*((L/H)*2)}px ${context.state.color1}, 
          ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*2)}px ${context.state.color2}`
        }

      }

      const neo_press = document.querySelectorAll(".neo-inverse")
      for (let i= 0; i < neo_press.length; i++) {
          
        const L = neo_press[i].offsetWidth
        const H = neo_press[i].offsetHeight
        neo_press[i].style.transition = `box-shadow ${context.state.time}s ease-in-out`

        if(L > H){
          neo_press[i].style.boxShadow = 
          `inset ${(L/10)*(H/L)}px ${(L/10)*(H/L)}px ${(L/10)*((H/L)*2)}px ${context.state.color1}, 
          inset ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*2)}px ${context.state.color2}`
            
        } else {
          neo_press[i].style.boxShadow = 
          `inset ${(H/10)*(L/H)}px ${(H/10)*(L/H)}px ${(H/10)*((L/H)*2)}px ${context.state.color1}, 
          inset ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*2)}px ${context.state.color2}`
        }

      }
    },

    //! Fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
    accessPage: function(){
  
      const userId = localStorage.getItem("userId")
      if (userId !== null) {

        axios.get(`/account/${userId}`)
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
