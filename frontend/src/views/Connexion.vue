<template>
    <div id="connexion">

        <!--- En-tête (GroupoMania) --->
        <div class="top">
            <img class="top__logo" src="../assets/icon-left-font-monochrome-black.svg" alt="Logo de Groupomania">
            <div class="top__separateur neo-inverse neo-press"></div>
        </div>

        <!--- Corps (Formulaire) --->
        <div class="body">
            <form class="formulaire">

                <!--- Titre et description (mode Inscription) --->
                <h2 v-if="mode == 'register'" class="formulaire__titre">Inscription</h2>
                <p v-if="mode == 'register'" class="formulaire__question">Vous avez déjà un compte ? 
                    <span @click="switchConnexion" class="formulaire__question--change">Se connecter</span>
                </p>

                <!--- Titre et description (mode Connexion) --->
                <h2 v-if="mode == 'connexion'" class="formulaire__titre">Connexion</h2>
                <p v-if="mode == 'connexion'" class="formulaire__question">Vous n'êtes pas inscrit ? 
                    <span @click="switchRegister" class="formulaire__question--change">Créer un compte</span>
                </p>

                <!--- Champ "nom" et "prénom" (mode Inscription) --->
                <div v-if="mode == 'register'" class="formulaire__name">
                    <input class="neo-inverse input" required v-model="prenom" type="text" placeholder="Prénom">
                    <input class="neo-inverse input" required v-model="nom" type="text" placeholder="Nom">
                </div>

                <div class="formulaire__identifiant">

                    <!--- Champ "email" et "mot de passe" (mode Inscription et Connexion) --->
                    <input class="neo-inverse input" required v-model="email" type="mail" placeholder="Email">
                    <div class="formulaire__identifiant__password">
                        <input class="neo-inverse input" required ref="inputPassword" v-model="password" type="password" placeholder="Mot de passe">
                        <div class="formulaire__identifiant__password__eye">
                            <div class="formulaire__identifiant__password__eye__icon" v-if="showPasswordIcon == false" @click="showPassword">
                                <img class="formulaire__identifiant__password__eye__icon--close" src="../assets/eye-close.svg" alt="">
                            </div>
                            <div class="formulaire__identifiant__password__eye__icon" v-if="showPasswordIcon == true" @click="maskPassword">
                                <img class="formulaire__identifiant__password__eye__icon--open" src="../assets/eye-open.svg" alt="">
                            </div>
                        </div>
                    </div>

                    <!--- Bouton de confirmation (mode Inscription) --->
                    <button id="neoButton" v-if="mode == 'register'" class="formulaire__identifiant__submit" type="button" value="S'inscrire">
                        <div @click.self="toRegister" class="formulaire__identifiant__submit__self"></div>
                        <span v-if="status == 'loading'">Inscription en cours ...</span>
                        <span v-if="status == 'normal'">S'inscrire</span>
                        <span v-if="status == 'create'">Votre compte à été crée !</span>
                    </button>

                    <!--- Bouton de confirmation (mode Connexion) --->
                    <button id="neoButton" v-if="mode == 'connexion'" class="formulaire__identifiant__submit" type="button" value="Se connecter">
                        <div @click.self="toConnect" class="formulaire__identifiant__submit__self"></div>
                        <span v-if="status == 'loading'">Connexion en cours ...</span>
                        <span v-if="status == 'normal'">Se connecter</span>
                    </button>

                    <!--- Case à cacher pour le maintien de la connexion (mode Connexion) --->
                    <div v-if="mode == 'connexion'" class="formulaire__identifiant__auto">
                        <input @change="longConnexion" class="neo formulaire__identifiant__auto__checkbox" name="autoConnect" id="autoConnect" type="checkbox">
                        <label class="formulaire__identifiant__auto__label" for="autoConnect">Maintenir la connexion</label>
                    </div>

                </div>

                <!--- Composant Error (pour les erreurs) --->
                <Error :class="{marge: mode == 'connexion'}"></Error>

            </form>
        </div>

    </div>
</template>


<script>
import Error from '@/components/Error.vue'

export default {
    name: 'Home',

    components: {
        Error
    },

    data: function(){
        return {
            //! Variable qui décide du type d'affichage (inscription ou connexion)
            mode: "connexion",
            //! Variable qui décide du message inscrit dans le bouton (normal, loading, create)
            status: 'normal',
            //! Emsemble de variable qui contiennent les informations du visiteur dans le formulaire
            prenom: "",
            nom: "",
            email: "",
            password: "",
            //! Variable qui témoigne si le bouton "maintenir la connexion" à été cochée
            autoConnect: false,
            //! Variable qui décide du type d'affichage de l'icône (voir le mot de passe)
            showPasswordIcon: false
        }
    },

    methods: {
        //! Fonction de mettre à jour un témoin (maintien de la connexion)
        longConnexion: function(event){
            this.autoConnect = event.target.checked
        },
        //! Fonction qui permet d'afficher le mot de passe
        showPassword: function(){
            this.$refs.inputPassword.type = "text"
            this.showPasswordIcon = true
        },
        //! Fonction qui permet de masquer le mot de passe
        maskPassword: function(){
            this.$refs.inputPassword.type = "password"
            this.showPasswordIcon = false
        },
        //! Fonction qui permet de se connecter
        toConnect: function(){

            this.$axios.post('account/login', {email: this.email, password: this.password})
            .then((response) => {
                
                this.$store.commit("DESACTIVE_ERROR")
                this.status = 'loading'

                const userId = response.data.userId
                const token = response.data.token
                const firstConnection = response.data.firstConnection

                this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token

                if(this.autoConnect == true) {

                    localStorage.setItem("userId", userId)
                    localStorage.setItem("token", token)

                } else {

                    sessionStorage.setItem("userId", userId)
                    sessionStorage.setItem("token", token)

                }

                setTimeout(function(){

                    if(firstConnection == 0) {

                        this.$router.push({name: 'Info', params: {id: userId}})

                    } else {

                        this.$router.push({name: 'Multimedia'})
                    }

                }.bind(this), 3000)
                
            })
            .catch(error => {
                this.$store.commit("ACTIVE_ERROR", JSON.parse(error.request.response).message)            
            })

        },
        //! Fonction qui permet de s'enrengistrer
        toRegister: function(){

            this.$axios.post('account/signup', {email: this.email, password: this.password, nom: this.nom, prenom: this.prenom})
            .then(() => {
            
                this.$store.commit("DESACTIVE_ERROR")
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
                this.$store.commit("ACTIVE_ERROR", JSON.parse(error.request.response).message)
            })
        },
        //! Fonction qui réinitialise toutes les variables
        dataReset: function(){
            this.$store.commit("DESACTIVE_ERROR")
            this.status = 'normal'
            this.email = ''
            this.password = ''
            this.nom = ""
            this.prenom = ""
            this.email = ""
            this.password = ""
        },
        //! Fonction qui réinitialise toutes les variables et passe en mode "inscription"
        switchRegister: function(){
            this.dataReset()
            this.mode = 'register'
        },
        //! Fonction qui réinitialise toutes les variables et passe en mode "connexion"
        switchConnexion: function(){
            this.dataReset()
            this.mode = 'connexion'
        }
    },

    //! Avant la création de la page, on applique la logique relative au "maintien de connexion"
    beforeMount: function(){
        
        this.$store.dispatch("majUserId")
        .then(() => {

            //* On récupère le "userId"
            const userId = this.$store.state.userId

            //* Si le témoin de maintien de connexion est avait été cochée ...
            if (userId !== null && userId !== undefined && userId !== "") {

                //* On renvoie le visiteur directement sur la page d'accueil
                this.$router.push({name: "Multimedia"})
                
            //* Sinon ...
            } else {

                //* On nettoie le localStorage et le sessionStorage
                localStorage.clear()
                sessionStorage.clear()

            }
        })
        .catch(() => {
            localStorage.clear()
            sessionStorage.clear()
        })

    },
    
    //! Quand la page est monté ...
    mounted: function(){

        //! On apllique le rendu de la fonction Neo
        this.$store.dispatch('neo')
    },

    //! Quand la  page est mise à jour ...
    updated: function(){

        //! On apllique le rendu de la fonction Neo
        this.$store.dispatch('neo')
    }

}
</script>

<style lang="scss" scoped>

    // Ensemble des variables globales (SASS)
    @import "../sass/global.scss";

    // Check-point @media
    $step-1: 750px;

    #connexion{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: $step-1){
            font-size: 10px;
        }
    }

    .marge{
        padding-top: 8px;
    }

    .input, button{
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        height: 50px;
        text-align: center;
        border-radius: 30px;
    }

    .top{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__logo{
            width: 500px;
            margin-top: 30px;
            @media screen and (max-width: $step-1) {
                width: 80%;
            }
        }

        &__separateur{
            margin-top: 30px;
            width: 90%;
            height: 8px;
        }

    }

    .body{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 230px);
        

        .formulaire{
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 600px;
            

            @media screen and (max-width: $step-1) {
                width: 90%;
            }

            &__titre{
                font-size: rem(35px);
                color: black;
                font-weight: bold;
                @media screen and (max-width: $step-1) {
                    font-size: rem(30px);
                }

            }

            &__question{

                padding: 10px 0 20px 0;

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
                    cursor: pointer;
                    position: relative;
                    background-color: $button-action;
                    box-shadow: $box-shadow-button;

                    &__self{
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                    }

                    span{
                        color: $button-action-inner;
                    }
                }

                &__auto{
                    margin-top: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &__label{
                        font-size: rem(16px);
                        color: black;
                        font-weight: bold;
                    }

                    &__checkbox{
                        border-radius: 5px;
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
    }
    
</style>