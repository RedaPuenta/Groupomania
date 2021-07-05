import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorAlert: false,
    errorText: "",
    color1: "#bebebe",
    color2: "#ffffff",
    color3: '#e0e0e0',
    time: 0.8
  },
  getters: {
  },
  mutations: {

    DESACTIVE_ERROR: function(state){
      state.errorAlert = false
      state.errorText = ""
    },

    ACTIVE_ERROR: function(state, text){
      state.errorAlert = true
      state.errorText = text
    },

    NEO_BUTTON_ACTIVE: function(state, event){
      console.log(event)
      let L = event.target.parentElement.offsetWidth
      let H = event.target.parentElement.offsetHeight

      if(event.target.parentElement.dataset.active == "false") {

        event.target.parentElement.dataset.active = true

        if(L > H) {
          event.target.parentElement.style.border = `${(L/H)*0.3}px solid ${state.color3}`
          event.target.parentElement.style.boxShadow = 
          `${(L/10)*(H/L)}px ${(L/10)*(H/L)}px ${(L/10)*((H/L)*2)}px ${state.color1}, 
          ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*2)}px ${state.color2},
          inset ${(L/10)*(H/L)}px ${(L/10)*(H/L)}px ${(L/10)*((H/L)*2)}px ${state.color1},
          inset ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*2)}px ${state.color2}`
        } else {
          event.target.parentElement.style.border = `${(H/L)*0.3}px solid ${state.color3}`
          event.target.parentElement.style.boxShadow = 
          `${(H/10)*(L/H)}px ${(H/10)*(L/H)}px ${(H/10)*((L/H)*2)}px ${state.color1},
          ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*2)}px ${state.color2},
          inset ${(H/10)*(L/H)}px ${(H/10)*(L/H)}px ${(H/10)*((L/H)*2)}px ${state.color1},
          inset ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*2)}px ${state.color2}`
        }

      } else if(event.target.parentElement.dataset.active == "true") {

        event.target.parentElement.dataset.active = false

        if(L > H) {
          event.target.parentElement.style.border = `${(L/H)*0.3}px solid ${state.color3}`
          event.target.parentElement.style.boxShadow = 
          `${(L/10)*(H/L)}px ${(L/10)*(H/L)}px ${(L/10)*((H/L)*2)}px ${state.color1}, 
          ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*-1)}px ${(L/10)*((H/L)*2)}px ${state.color2}`
        } else {
          event.target.parentElement.style.border = `${(H/L)*0.3}px solid ${state.color3}`
          event.target.parentElement.style.boxShadow = 
          `${(H/10)*(L/H)}px ${(H/10)*(L/H)}px ${(H/10)*((L/H)*2)}px ${state.color1},
          ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*-1)}px ${(H/10)*((L/H)*2)}px ${state.color2}`
        }
      }
    }
  },
  actions: {
    neo: function(context){
      //* Neo
      let neo = document.querySelectorAll(".neo")
      for (let i= 0; i < neo.length; i++) {
          
        let L = neo[i].offsetWidth
        let H = neo[i].offsetHeight
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

      //* Neo-inverse
      let neo_press = document.querySelectorAll(".neo-inverse")
      console.log(neo_press)
      for (let i= 0; i < neo_press.length; i++) {
          
        let L = neo_press[i].offsetWidth
        let H = neo_press[i].offsetHeight
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

    accessPage: function(){
  
      const userId = localStorage.getItem("userId")

      if (userId !== null) {

        axios.get(`/account/${userId}`)
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
