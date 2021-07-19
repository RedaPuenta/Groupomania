<template>
    <nav id="navbar">

        <div class="neo navbar">
            
            <!--- Logo NavBar (Accueil/Account) [Desktop/Mobile]--->
            <img class="navbar__logo" src="../assets/icon-left-font-monochrome-black.svg" alt="Logo de groupomania">

            <!--- Partie Explorateur (Accueil) [Desktop] --->
            <div v-if="mode == 'accueil'" class="navbar__explorer">
                <ul class="navbar__explorer__list">
                    <li><router-link to="/Multimedia">Multimédia</router-link></li>
                    <li><router-link to="/Agora">Agora</router-link></li>
                    <li><router-link to="/Friends">Camarade</router-link></li>
                </ul>
            </div>

            <!--- Partie "Compte" (Accueil) [Desktop] --->
            <div v-if="mode == 'accueil'" class="navbar__account">

                <!--- Avatar et prénom de l'utilisateur --->
                <div class="navbar__account__avatar">
                    <div class="navbar__account__avatar__case">
                        <button @click="toggleControl" class="navbar__account__avatar__case__button">
                            <img :src="avatar" alt="Avatar de profil">
                            <span>{{firstName}}</span>
                        </button>
                    </div>
                </div>

                <div v-if="toggle == true" class="navbar__account__active">

                    <!--- Mon compte --->
                    <router-link :to="{name: 'Profil', params: {id: userId}}">
                        <div class="navbar__account__active__item">
                            <span>Mon compte</span>
                        </div>
                    </router-link>

                    <!--- Déconnexion --->
                    <div @click="deconnect" class="navbar__account__active__item">
                        <span>Déconnexion</span>
                    </div>

                </div>
            </div>

            <!--- Explorateur (Accueil) [Mobile] --->
            <div v-if="mode == 'accueil'" class="navbar__mobile">
                <div class="navbar__mobile__button">
                    <div @click.self="toggleMobileControl" class="navbar__mobile__button__self"></div>
                    <i name="mobile-desactive" class="navbar__mobile__button__icon fas fa-stream fa-lg"></i>
                    <i name="mobile-active" style="display: none;" class="navbar__mobile__button__icon fas fa-times fa-lg"></i>
                </div>
            </div>

            <!--- Bouton "Supprimer mon compte" (Account) [Desktop] --->
            <div @click="deleteUser" class="navbar__profil" v-if="mode == 'account' && us == true">
                <span class="navbar__profil__text">{{text_delete}}</span>
                <i class="navbar__profil__icon fas fa-trash fa-lg"></i>
            </div>

            <!--- Bouton "Modifier mes informations" (Account) [Desktop] --->
            <div class="navbar__profil" v-if="mode == 'account' && us == true">
                <router-link :to="{name: 'Info', params: {id: userId}}">
                    <span class="navbar__profil__text">{{text_update}}</span>
                    <i class="navbar__profil__icon fas fa-user-edit fa-lg"></i>
                </router-link>
            </div>

            <!--- Bouton de retour à l'accueil (Account) [Desktop/Mobile] --->
            <div class="navbar__back" v-if="mode == 'account'">
                <router-link :to="{name: 'Multimedia'}">
                    <span class="navbar__back__text">Retour à l'accueil</span>
                    <i class="navbar__back__icon fas fa-long-arrow-alt-right fa-lg"></i>
                </router-link>
            </div>

        </div>

        <!--- Toggle (Accueil) [Mobile] --->
        <div v-if="toggle_mobile == true && mode == 'accueil'" class="mobile">
            
            <!--- Explorateur --->
            <div class="mobile__case">
                <span>
                    <router-link to="/Multimedia">Multimédia</router-link>
                </span>
                <span>
                    <router-link to="/Agora">Agora</router-link>
                </span>
                <span>
                    <router-link to="/Friends">Camarade</router-link>
                </span>
            </div>

            <!--- Partie compte  --->
            <div class="mobile__case">
                <span>
                    <router-link :to="{name: 'Profil', params: {id: userId}}">Mon compte</router-link>
                </span>
                <span @click="deconnect">Déconnexion</span>
            </div>

        </div>

        <!--- Toggle (Account) [Mobile] --->
        <div class="profil" v-if="mode == 'account' && us == true">
            
            <!--- Bouton "Supprimer mon compte" --->
            <div @click="deleteUser" class="profil__item" v-if="mode == 'account' && us == true">
                <span class="profil__item__text">{{text_delete}}</span>
                <i class="profil__item__icon fas fa-trash fa-lg"></i>
            </div>

            <!--- Bouton "Modifier mes informations" --->
            <div class="profil__item" v-if="mode == 'account' && us == true">
                <router-link :to="{name: 'Info', params: {id: userId}}">
                    <span class="profil__item__text">{{text_update}}</span>
                    <i class="profil__item__icon fas fa-user-edit fa-lg"></i>
                </router-link>
            </div>

        </div>

    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    
    props: {
        //! Propriété qui permet de décidé du type d'affichage (Accueil/Account)
        mode: {type: String, required: true}
    },

    data: function(){
        return {
            //! Ensemble de variables qui contiennent des informations récupérées à partir de l'API sur l'uilisateur
            avatar: "",
            firstName: "",
            userId: "",
            //! Variable qui permet d'afficher les boutons de gestion de compte si la page profil appartient à l'utilisateur
            us: false,
            //! Ensemble de variables qui contiennent les textes des boutons de gestion de compte
            text_delete: "",
            text_update: "",
            //! Variable qui connaît l'état du bouton "Mon compte" (Accueil)
            toggle: false,
            //! Variable qui connaît l'état du bouton "Menu tiroir" (Accueil)
            toggle_mobile: false,
            //! Variable qui contient le privilège de l'utilisateur (1 par défaut)
            privilege: 1
        }
    },

    methods: {
        //! Fonction qui met à jour la variable d'état du bouton "Mon compte" (Accueil)
        toggleControl: function(){
            
            if(this.toggle == false) {
                this.toggle = true
            } else {
                this.toggle = false
            }
        },
        //! Fonction qui met à jour la variable d'état du bouton "Menu tiroir" (Accueil)
        toggleMobileControl: function(){

            let mobile_desactive = document.getElementsByName("mobile-desactive")
            let mobile_active = document.getElementsByName("mobile-active")
            
            if(this.toggle_mobile == false){

                this.toggle_mobile = true
                mobile_desactive[0].style.display = "none"
                mobile_active[0].style.display = "block"

            } else if(this.toggle_mobile == true){

                this.toggle_mobile = false
                mobile_desactive[0].style.display = "block"
                mobile_active[0].style.display = "none"
            }
        },  
        //! Fonction qui permet de déconnecter un utilisateur
        deconnect: function(){

            this.$dialog.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')
            .then((dialog) => {

                localStorage.clear()
                this.$router.push({name: 'Connexion'})
                dialog.close()
                
            })
            .catch(() => {
                this.toggle = false
            })
        },
        //! Fonction qui sert uniquement à la fonction ci dessous !
        textConfirmCustom: function(){
            if(this.privilege > 1 && this.$route.params.id !== localStorage.getItem("userId").toString()){
                return 'supprimer son compte'
            } else {
                return 'supprimer votre compte'
            }
        },
        //! Fonction qui permet de supprimer un utilisateur
        deleteUser: function(){
            
            const textCustom = this.textConfirmCustom()

            this.$dialog.confirm(`Êtes-vous sûr de vouloir ${textCustom} ?`)
            .then((dialog) => {

            const userId = this.$route.params.id

                this.$axios.delete(`/user/${userId}`)
                .then(() => {

                    if(this.privilege == 1 || this.$route.params.id == localStorage.getItem("userId")){

                        localStorage.clear()
                        this.$router.push({name: 'Connexion'})
                        dialog.close()

                    } else{

                        this.$router.push({name: 'Friends'})
                        dialog.close()
                        
                    }

                })
                .catch((error) => {
                    console.log(error)
                })

            })

        }
    },

    //! Avant que la page soit monté ...
    beforeMount: function(){

        const userId = localStorage.getItem("userId")
        
        //! On récupère les informations de l'utilisateur inscrit dans la barre de navigation
        this.$axios.get(`user/info/${userId}`)
        .then((response) => {
            this.avatar = response.data.info[0].avatar
            this.firstName = response.data.info[0].firstName
            this.privilege = response.data.privilege
        })
        .then(() => {
            if(this.mode == 'accueil'){
                this.userId = localStorage.getItem("userId")
            } else if(this.mode == 'account'){
                this.userId = this.$route.params.id
            }
        })
        .then(() => {
            
            //* On détermine si la page "Profil" sur laquelle l'utilisateur se trouve lui appartient
            if(userId == this.$route.params.id || this.privilege > 1){
                this.us = true
            }

            if(this.privilege > 1 && this.$route.params.id !== localStorage.getItem("userId").toString()){
                this.text_delete = "Supprimer son compte"
                this.text_update = "Modifier ses informations"
            } else {
                this.text_delete = "Supprimer mon compte"
                this.text_update = "Modifier mes informations"
            }
            
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
</script>

<style lang="scss" scoped>

    // Ensemble des variables globales (SASS)
    @import "../sass/global.scss";

    // Check-point @media
    $step-1: 870px;
    $step-2: 1140px;

    .router-link-active{
        font-weight: bold;
        font-size: rem(17px);
        @media screen and (max-width: $step-1){
            color: white!important;
            font-weight: 900!important;
        }
    }

    #navbar{
        width: 100%;
    }

    .navbar{
        background-color: $color-secondary;
        border-radius: 0px!important;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 30px;
        position: relative;

        &__logo{
            width: 200px;
        }

        &__explorer{
            padding: 0 50px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            @media screen and (max-width: $step-1){
                display: none;
            }

            &__list{
                display: flex;
                list-style-type: none;

                li{
                    padding: 0 10px;
                    letter-spacing: 2px;
                    cursor: pointer;

                    a{
                        color: black;
                        transition: color 0.3s ease-in-out;
                    }

                    a:hover{
                        color: rgb(180, 180, 180);
                    }

                }
            
            }
        }

        &__account{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            position: relative;
            height: 100%;
            @media screen and (max-width: $step-1){
                display: none;
            }

            &__avatar{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 100%;
                position: relative;
                

                &__case{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    

                    &__button{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        background-color: $color-secondary;

                        img {
                            border-radius: 100%;
                            width: 55px;
                            transition: filter 0.4s ease-in-out;
                        }                         
                    
                        span{
                            font-weight: 900;
                            font-size: rem(15px);
                            margin-top: 6px;
                            letter-spacing: 1.5px;
                            text-shadow: 0.5px 0.5px rgb(0, 0, 0), -0.5px -0.5px rgb(255, 255, 255);
                            color: darken($color-secondary, 15);
                        }
                    }

                    &__button:hover img{
                        filter: brightness(1.5);
                    }
                    
                }
            }

            &__active{
                background-color: $button-action;
                border-radius: 15px;
                position: absolute;
                top: 110px;
                box-shadow: $box-shadow-button;
                overflow: hidden;

                &__item{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 180px;
                    height: 40px;
                    color: rgb(255, 255, 255);
                    cursor: pointer;
                }

                &__item:hover{
                    transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out;
                    color: black;
                    background-color: white;
                }

                &__item:nth-child(1){
                    border-bottom: 1px solid rgb(255, 255, 255);
                }
            }
        }

        &__mobile{
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: 30px;
            @media screen and (max-width: $step-1){
                display: flex;
            }

            &__button{
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                height: 60px;
                width: 60px;

                &__self{
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    cursor: pointer;
                }

                &__icon{
                    color: black;
                    font-size: rem(30px);
                }
            }

        }

        &__profil{
            padding: 10px;
            margin-right: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $button-action;
            border-radius: 10px;
            box-shadow: $box-shadow-button;
            color: $button-action-inner;
            cursor: pointer;
            @media screen and (max-width: $step-2){
                display: none;
            }

            &__text{
                margin-right: 10px;
                color: $button-action-inner;
            }

            &__icon{
                font-size: rem(15px);
                color: $button-action-inner;
            }
        }

        &__back{
            padding: 10px;
            margin-right: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            &__text{
                margin-right: 8px;
                color: rgb(0, 0, 0);
                @media screen and (max-width: $step-0){
                    display: none;
                }
            }

            &__icon{
                font-size: rem(15px);
                color: rgb(0, 0, 0);
                @media screen and (max-width: $step-0){
                    font-size: rem(45px);
                }
            }
        }
    }

    .mobile{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: black;
        position: relative;

        &__case{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 3px;

            span{
                color: rgb(255, 255, 255);
                margin: 1px;
                padding: 5px 0;
                letter-spacing: 2px;
                font-size: rem(17px);
                cursor: pointer;
            }

            a{
                text-align: inherit;
                font-weight: inherit;
                letter-spacing: inherit;
                text-shadow: inherit;
                font-size: inherit;
                color: inherit;
            }

            &__item{
                width: 100%;
                text-align: center;
            }
        }

    }

    .profil{
        width: 100%;
        display: none;
        justify-content: space-evenly;
        align-items: center;
        padding: 15px;
        background-color: black;
        position: relative;
        @media screen and (max-width: $step-2){
            display: flex;
        }

        @media screen and (max-width: $step-0){
            flex-direction: column;
            padding: 5px;
        }

        &__item{
            padding: 7px;
            background-color: rgb(255, 255, 255);
            border-radius: 5px;
            box-shadow: 1px 1px 8px rgba(255, 255, 255, 0.685);
            color: rgb(0, 0, 0);
            cursor: pointer;
            @media screen and (max-width: $step-0){
                margin: 10px;
            }

            &__text{
                color: inherit;
                margin-right: 10px;
            }

            &__icon{
                color: inherit;
                font-size: rem(16px);
            }

            a{
                color: inherit;
            }

        }

    }

    .focus{
        color: black;
        font-weight: bold;
    }
</style>