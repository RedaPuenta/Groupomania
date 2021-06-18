<template>
    <div id="connexion">

        <img class="logo" src="../assets/icon-left-font-monochrome-black.svg" alt="Logo de Groupomania">
        <div class="separateur neo neo-press"></div>

        <h2 v-if="mode == 'register'" class="titre">Inscription</h2>
        <p v-if="mode == 'register'" class="question">Vous avez déjà un compte ? <span @click="switchConnexion" class="question--change">Se connecter</span></p>
        
        <h2 v-if="mode == 'connexion'" class="titre">Connexion</h2>
        <p v-if="mode == 'connexion'" class="question">Vous n'êtes pas inscrit ? <span @click="switchRegister" class="question--change">Créer un compte</span></p>
        
        <form class="formulaire">

            <div v-if="mode == 'register'" class="formulaire__name">
                <input v-model="prenom" class="neo" type="text" placeholder="Prénom">
                <input v-model="nom" class="neo" type="text" placeholder="Nom">
            </div>

            <div class="formulaire__identifiant">

                <input v-model="email" class="neo" type="mail" placeholder="Email">
                <input v-model="password" class="neo" type="password" placeholder="Mot de passe">

                <button v-if="mode == 'register'" @click.prevent="toRegister" class="neo formulaire__identifiant__submit" type="submit" value="S'inscrire">
                    <span v-if="status == 'loading'">Inscription en cours ...</span>
                    <span v-if="status == 'normal'">S'inscrire</span>
                    <span v-if="status == 'loadingAfter'">Connexion en cours ...</span>
                </button>

                <button v-if="mode == 'connexion'" @click.prevent="toConnect" class="neo formulaire__identifiant__submit" type="submit" value="Se connecter">
                    <span v-if="status == 'loading'">Connexion en cours ...</span>
                    <span v-if="status == 'normal'">Se connecter</span>
                </button>

            </div>

        </form>

        <p class="error">{{rep}}</p>

    </div>
</template>

<script>
export default {
  name: 'Home',

  data: function(){
    return {
      mode: "register",
      status: 'normal',
      prenom: "",
      nom: "",
      email: "",
      password: "",
      rep: ""
    }
  },

  methods: {
    toConnect: function(){

        this.$axios.post('auth/login', {email: this.email, password: this.password})
        .then((response) => {

            this.rep = ""
            this.status = 'loading'

            var token = response.data.token 
            this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            
            setTimeout(function(){
                this.$router.push({name: 'Actuality'})
            }.bind(this), 3000)
            
        })
        .catch(error => {
            this.rep = JSON.parse(error.request.response).message
        })

    },

    toRegister: function(){

        this.$axios.post('auth/signup', {email: this.email, password: this.password, nom: this.nom, prenom: this.prenom})
        .then(() => {

            this.rep = ""
            this.status = 'loading'

            setTimeout(function(){

                this.status = 'normal'

                this.$axios.post('auth/login', {email: this.email, password: this.password})
                .then((response) => {

                    this.status = 'loadingAfter'

                    var token = response.data.token 
                    this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token;

                    setTimeout(function(){
                        this.$router.push({name: 'Actuality'})
                    }.bind(this), 2000)

                })
                .catch( error => {
                    this.rep = JSON.parse(error.request.response).message
                })

            }.bind(this), 2000)

        })
        .catch(error => {
            this.rep = JSON.parse(error.request.response).message
        })
    },

    switchRegister: function(){
        this.mode = 'register'
        this.status = 'normal'
        this.email = ''
        this.password = ''
        this.rep = ''
    },

    switchConnexion: function(){
        this.mode = 'connexion'
        this.status = 'normal'
        this.email = ''
        this.password = ''
        this.rep = ''
    }
  },

  mounted: function(){
    this.$store.dispatch('neo')
  },

  updated: function(){
    this.$store.dispatch('neo')
  }

}
</script>

<style lang="scss" scoped>

    #connexion{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .logo{
        width: 500px;
        margin-top: 30px;
    }

    .separateur{
        margin-top: 30px;
        width: 80%;
        height: 5px;
    }

    .titre{
        margin-top: 50px;
        font-size: 40px;
        color: black;
        font-weight: bold;
    }

    .question{
        margin-top: 10px;

        &--change{
            cursor: pointer;
            color: black;
            font-weight: bold;
            transition: color 0.4s ease-in-out;
        }

        &--change:hover{
            color: rgb(204, 204, 204);
        }
    }

    .formulaire{
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 600px;

        &__name{
            display: flex;
            width: 100%;

            input:first-child{
                margin-right: 10px;
            }

            input:last-child{
                margin-left: 10px;
            }
            
        }

        &__identifiant{
            width: 100%;

            &__submit{
                background-color: #1b1d1f;
                color: white;
                cursor: pointer;

                span{
                    color: white;
                }
            }

        }
       
        input, button{
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
            height: 50px;
            text-align: center;
        }
    }
    
    .error, .good{
        margin-top: 10px;
        font-size: 16px;
        color: rgba(223, 0, 0, 0.849);
        font-weight: bold;
    }

    .error{
        color: rgba(223, 0, 0, 0.849);;
    }
    .good{
        color: rgba(0, 206, 137, 0.849);
    }

</style>