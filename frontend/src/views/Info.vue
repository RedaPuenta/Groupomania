<template>
<div class="center">
  <div class="info">

        <!---- Titre ---->
        <h1 class="info__titre">Compléter vos informations</h1>

        <!---- Liste des avatars ---->
        <div class="neo-inverse info__avatar">
            <div class="info__avatar__list">
                <div v-for="(item, index) in list_avatar" :key="index" class="info__avatar__list__item">
                    <img :src="item" alt="Avatar">
                    <div @click="getAvatar" :data-avatar="item" name="focus" class="info__avatar__list__item__shadow"></div>
                </div>
            </div>
        </div>

        <div class="info__details">

            <div class="info__details__name">

                <!---- Champ "Prénom" ---->
                <input class="neo-inverse" type="text" placeholder="Prénom" v-model="firstName">

                <!---- Avatar de l'utilisateur ---->
                <div class="info__details__name__avatar">
                    <img :src="avatar" alt="Avatar par défaut">
                    <div class="info__details__name__avatar__shadow"></div>
                </div>

                <!---- Champ "Nom" ---->
                <input class="neo-inverse" type="text" placeholder="Nom" v-model="lastName">
            </div>

            <!---- Champ Biographie ---->
            <div class="info__details__bio">
                <textarea name="textArea" class="neo-inverse" @input="maxLengthBio" maxlength="150" rows="4" placeholder="Biographie" v-model="bio"></textarea>
                <div class="info__details__bio__counter">
                    <span name="textAreaLength">0</span>
                    <span>/150</span>
                    <i class="info__details__bio__counter__icon fas fa-text-width fa-sm" ></i>
                </div>
            </div>
            

            <!---- Bouton de soumission ---->
            <button v-if="desactiveButton == false" @click="updateInfo">{{buttonText}}</button>
            <button v-if="desactiveButton == true" >{{buttonText}}</button>
        </div>
        
        <!---- Lien de retour à l'accueil ---->
        <router-link class="info__after" :to="{name: 'Multimedia'}">
            <span>Je ferais ça plus tard</span>
        </router-link>

        <!---- Composant Erreur (si il y a des erreurs) ---->
        <Error class="info__erreur"></Error>
    
    </div>
</div>
</template>

<script>
import Error from '@/components/Error.vue'

export default {
    name: "Info",

    components: {
        Error
    },

    data: function(){
        return {
            //! Variable qui contient la liste des avatars que l'utilisateur peut choisir
            list_avatar: [],
            //! Emsemble de variable qui contiennent les informations de l'utilisateur dans le formulaire
            bio: "",
            firstName: "",
            lastName: "",  
            avatar: "",
            //! Variable qui contient le texte du bouton de soumission
            buttonText: "Enrengistrer et continuer",
            //! Variable qui permet de désactiver l'évènement sur le bouton de soummission
            desactiveButton: false
        }
    },  

    methods: {
        //! Fonction qui permet de compter et d'indiquer en temps réel le nombre de caractères de la bio
        maxLengthBio: function(event){
            
            event.target.parentElement.children[1].children[0].textContent = event.target.value.length
        },
        //! Fonction qui pré-affiche l'avatar choisie par l'utilisateur
        getAvatar: function(event){
            this.avatar = event.target.dataset.avatar
        },
        //! Fonction qui permet à l'utilisateur de modifier ses informations
        updateInfo: function(){

            const avatar = this.avatar
            const bio = this.bio
            const firstName = this.firstName
            const lastName = this.lastName
            const userId = this.$route.params.id

            this.$axios.put(`/user/${userId}`, {avatar: avatar, bio: bio, firstName: firstName, lastName: lastName})
            .then(() => {

                this.desactiveButton = true
                this.$store.commit("DESACTIVE_ERROR")
                this.buttonText = "Enrengistrement en cours ..."
                
                setTimeout(function(){

                    this.$router.push({name: 'Multimedia'})

                }.bind(this), 2000)

            })
            .catch((error) => {
                
                this.$store.commit("ACTIVE_ERROR", JSON.parse(error.request.response).message)
                
            })
        }
    },


    //! Avant la création de la page ...
    beforeCreate: function(){

        //! On exécute la fonction qui permet de mettre à jour le userId dans le store (choix entre local et session)
        this.$store.dispatch('majUserId')
        .then(() => {
            //! On exécute la fonction qui permet d'autorisé un visiteur d'accéder aux pages du site
            this.$store.dispatch('accessPage')
        })
        .catch(() => {
            this.$router.push({name: "Connexion"})
        })
        
    },

    //! Une fois que la page est monté ...
    beforeMount: function(){

        //! On exécute la fonction Neo
        this.$store.dispatch('neo')

        //! On récupère la liste d'avatar et les informations de l'utilisateur
        this.$axios.get(`/asset/avatar`)
        .then((response) => {

            this.list_avatar = response.data
            
            const userId = this.$route.params.id

            this.$axios.get(`user/info/${userId}`)
            .then((response) => {
                
                this.firstName = response.data.info[0].firstName
                this.lastName = response.data.info[0].lastName
                this.bio = response.data.info[0].bio
                this.avatar = response.data.info[0].avatar

            })  
            .then(() => {
                let textArea = document.getElementsByName("textArea")
                let textAreaLength = document.getElementsByName("textAreaLength")

                textAreaLength[0].textContent = textArea[0].value.length
                
            })
            .catch(() => {
                this.$router.push({name: "Multimedia"})
            })

        })
        .catch((error) => {
            console.log(error)
        })
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
    $step-1: 1050px;
    $step-2: 700px;

    .center{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        @media screen and (max-width: $step-1){
            width: 90%;
        }

        &__titre{
            padding: 15px;
            margin-bottom: 40px;
            font-size: rem(30px);
            font-weight: bold;
            color: black;
            position: relative;
            text-align: center;
            @media screen and (max-width: $step-2){
                font-size: rem(25px);
            }
        }

        
        &__titre::before{
            content: "";
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgb(59, 59, 59);
            height: 2px;
            margin: auto;
        }
        
        &__avatar{
            width: 100%;
            height: 130px;
            overflow-x: scroll;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            @media screen and (max-width: $step-2){
                height: 100%;
            }

            &__list{
                padding: 15px 0px;
                height: 100%;
                display: flex;
                justify-content: center;

                &__item:hover{
                    transform: scale(1.2);
                    filter: brightness(1.5)
                }

                &__item{
                    border-radius: 100%;
                    position: relative;
                    height: 80px;
                    width: 80px;
                    margin: 0 10px;
                    cursor: pointer;
                    transition: transform 0.4s ease-in-out, filter 0.4s ease-in-out;
                    @media screen and (max-width: $step-2){
                        height: 60px;
                        width: 60px;
                    }

                    img{
                        height: 80px;
                        width: 80px;
                        border-radius: 100%;
                        @media screen and (max-width: $step-2){
                            height: 60px;
                            width: 60px;
                        }
                    }

                    &__shadow{
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 100%;
                        box-shadow: $box-shadow-inner;
                    }
                }
            }
        }

        &__details{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 40px;

            &__name{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                input{
                    width: 35%;
                }

                &__avatar{
                    border-radius: 100%;
                    position: relative;
                    width: 120px;
                    height: 120px;
                    @media screen and (max-width: $step-2){
                        width: 80px;
                        height: 80px;
                    }

                    img{
                        width: 120px;
                        height: 120px;
                        border-radius: 100%;
                        @media screen and (max-width: $step-2){
                            width: 80px;
                            height: 80px;
                        }
                    }

                    &__shadow{
                        border-radius: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 100%;
                        box-shadow: $box-shadow-inner;
                    }

                }

            }

            &__bio{
                width: 100%;
                height: 100%;
                margin: 20px 0;
                position: relative;

                span{
                    font-weight: bold;
                }

                &__counter{
                    position: absolute;
                    top: -20px;
                    right: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &__icon{
                        margin-left: 5px;
                    }
                }

                textarea{
                    text-align: center;
                    width: 100%;
                    border-radius: 10px;
                    padding: 15px 5px;
                    resize: none;
                    background-color: $color-secondary;
                }
            }

            button{
                border-radius: 30px;
                color: $button-action-inner;
                background-color: $button-action;
                height: 50px;
                width: 100%;
                margin: 20px 0 5px 0;
                box-shadow: $box-shadow-button;
                cursor: pointer;
                @media screen and (max-width: $step-2){
                    height: 45px;
                }
            }
        }

        &__after {
            margin-top: 10px;

            span{ 
                font-size: rem(17px);
                color: black;
                text-decoration: underline;
            }
        }

        &__erreur{
            margin-top: 15px;
        }
        
    }

    input{
        margin: 20px 0;
        text-align: center;
        width: 100%;
        border-radius: 30px;
        height: 50px;
        @media screen and (max-width: $step-2){
            height: 45px;
        }
    }

    ::-webkit-scrollbar{
        width: 5px;
        height: 8px;
        @media screen and (max-width: $step-2){
            height: 5px;
        }
    }

    textarea::-webkit-scrollbar-thumb{
        background-color: rgb(0, 0, 0);
        border-radius: 0 10px 10px 0;
    }

    .info__avatar::-webkit-scrollbar-track{
        background-color: rgba(255, 255, 255, 0.445);
    }

    .info__avatar::-webkit-scrollbar-thumb{
        background-color: rgb(0, 0, 0);
    }

</style>