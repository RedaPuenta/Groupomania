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
                <input class="neo input" required v-model="prenom" type="text" placeholder="Prénom">
                <input class="neo input" required v-model="nom" type="text" placeholder="Nom">
            </div>

            <div class="formulaire__identifiant">

                <input class="neo input" required v-model="email" type="mail" placeholder="Email">
                <div class="formulaire__identifiant__password">
                    <input class="neo input" required ref="inputPassword" v-model="password" type="password" placeholder="Mot de passe">
                    <div class="formulaire__identifiant__password__eye">
                        <div class="formulaire__identifiant__password__eye__icon" v-if="showPasswordIcon == false" @click="showPassword">
                            <img class="formulaire__identifiant__password__eye__icon--close" src="../assets/eye-close.svg" alt="">
                        </div>
                        <div class="formulaire__identifiant__password__eye__icon" v-if="showPasswordIcon == true" @click="maskPassword">
                            <img class="formulaire__identifiant__password__eye__icon--open" src="../assets/eye-open.svg" alt="">
                        </div>
                    </div>
                </div>

                <button v-if="mode == 'register'" @click.prevent="toRegister" class="neo formulaire__identifiant__submit" type="submit" value="S'inscrire">
                    <span v-if="status == 'loading'">Inscription en cours ...</span>
                    <span v-if="status == 'normal'">S'inscrire</span>
                    <span v-if="status == 'create'">Votre compte à été crée !</span>
                </button>

                <button v-if="mode == 'connexion'" @click.prevent="toConnect" class="neo formulaire__identifiant__submit" type="submit" value="Se connecter">
                    <span v-if="status == 'loading'">Connexion en cours ...</span>
                    <span v-if="status == 'normal'">Se connecter</span>
                </button>

                <div v-if="mode == 'connexion'" class="formulaire__identifiant__auto">
                    <input @change="longConnexion" class="neo formulaire__identifiant__auto__checkbox" name="autoConnect" id="autoConnect" type="checkbox">
                    <label class="formulaire__identifiant__auto__label" for="autoConnect">Maintenir la connexion</label>
                </div>

            </div>

        </form>

         <div class="error" v-if="errorAlert == true">
            <div @click="quitError" class="error__icon">
                <i class="error__icon--croix fas fa-times"></i>
            </div>
            <span class="error__text">{{errorText}}</span>
        </div>

    </div>
</template>

<script>
export default {
  name: 'Home',

  data: function(){
    return {
      mode: "connexion",
      status: 'normal',
      prenom: "",
      nom: "",
      email: "",
      password: "",
      errorText: "",
      errorAlert: false,
      autoConnect: false,
      showPasswordIcon: false
    }
  },

  methods: {

    quitError: function(){
        this.errorAlert = false
        this.errorText = ""
    },

    longConnexion: function(event){
        this.autoConnect = event.target.checked
    },

    showPassword: function(){
        this.$refs.inputPassword.type = "text"
        this.showPasswordIcon = true
    },

    maskPassword: function(){
        this.$refs.inputPassword.type = "password"
        this.showPasswordIcon = false
    },

    toConnect: function(){

        this.$axios.post('auth/login', {email: this.email, password: this.password})
        .then((response) => {
            
            this.errorAlert = false
            this.errorText = ""
            this.status = 'loading'

            const userId = response.data.userId
            const token = response.data.token
            this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token

            localStorage.setItem("userId", userId)
            localStorage.setItem("token", token)

            if(this.autoConnect == true) {

                localStorage.setItem("connexion", "auto")

            } else {

                localStorage.setItem("connexion", "manuel")

            }

            setTimeout(function(){
                this.$router.push({name: 'Actuality'})
            }.bind(this), 3000)
            
        })
        .catch(error => {
            this.errorAlert = true
            this.errorText = JSON.parse(error.request.response).message
        })

    },

    toRegister: function(){

        this.$axios.post('auth/signup', {email: this.email, password: this.password, nom: this.nom, prenom: this.prenom})
        .then(() => {

            this.errorAlert = false
            this.errorText = ""
            this.status = 'loading'

            setTimeout(function(){

                this.status = 'create'

                setTimeout(function(){

                    this.status = 'normal'
                    this.mode = "connexion"

                }.bind(this), 2000)

            }.bind(this), 2000)

        })
        .catch(error => {
            this.errorAlert = true
            this.errorText = JSON.parse(error.request.response).message
        })
    },

    switchRegister: function(){
        this.mode = 'register'
        this.status = 'normal'
        this.email = ''
        this.password = ''
        this.errorText = ''
        this.errorAlert = false
        this.nom = ""
        this.prenom = ""
        this.email = ""
        this.password = ""
    },

    switchConnexion: function(){
        this.mode = 'connexion'
        this.status = 'normal'
        this.email = ''
        this.password = ''
        this.errorText = ''
        this.errorAlert = false
        this.nom = ""
        this.prenom = ""
        this.email = ""
        this.password = ""
    }
    
  },

  beforeCreate: function(){

    const tokenLocal = localStorage.getItem("token")
    const userIdLocal = localStorage.getItem("userId")
    const modeConnexion = localStorage.getItem("connexion")

    if (modeConnexion == "auto") {

        this.$axios.post('/access', {token: tokenLocal, userId: userIdLocal})
        .then(() => {
            this.$router.push({name: "Actuality"})
        })
        .catch(() => {
            localStorage.clear()
        })
        
    } else {

        localStorage.clear()

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

    @import "../sass/global.scss";

    #connexion{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .input:focus{
       background-color: $color-third;
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
        font-size: rem(40px);
        color: black;
        font-weight: bold;
    }

    .input, button{
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        height: 50px;
        text-align: center;
        transition: background-color 0.7s ease-in-out;
    }

    .error{
        margin-top: 10px;
        font-size: rem(16px);
        color: $color-error;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        &__icon{
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 23px;
            width: 23px;
            background-color: $color-error;
            margin-right: 8px;
            box-shadow: $box-shadow-button;
            cursor: pointer;

            &--croix{
                color: white;
            }
        }
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

            &__password{
                position: relative;

                &__eye{
                    position: absolute;
                    top: 34%;
                    right: 30px;

                    &__icon{
                        cursor: pointer;

                        &--open{
                            width: 25px;
                        }

                        &--close{
                            width: 25px;
                        }
                    }
                }
            }

            &__submit{
                background-color: $button-action;
                color: white;
                cursor: pointer;

                span{
                    color: white;
                }
            }

            &__auto{
                margin-top: 10px;
                display: flex;
                justify-content: center;
                align-items: center;

                &__label{
                    font-size: rem(16px);
                    color: black;
                    font-weight: bold;
                }

                &__checkbox{
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    background-color: $color-secondary;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: background-color 0.5s ease-in-out;
                }

                &__checkbox::after{
                    font-family: "Font Awesome 5 Free";
                    content: "\f00c";
                    font-weight: bold;
                    color: darken($color-secondary, 10%);
                }

                &__checkbox:hover{
                    background-color: darken($color-secondary, 10%);
                    color: black;
                }

                &__checkbox:hover::after{
                    color: white;
                }

                &__checkbox:checked::after{
                    color: black;
                }
            }

        }
    }
    
</style>